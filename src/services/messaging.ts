type MessageHandler = (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => void | boolean | Promise<void>;

class MessagingService {
  private static instance: MessagingService;
  private handlers: Map<string, MessageHandler[]>;

  private constructor() {
    this.handlers = new Map();
    this.initialize();
  }

  static getInstance(): MessagingService {
    if (!MessagingService.instance) {
      MessagingService.instance = new MessagingService();
    }
    return MessagingService.instance;
  }

  private initialize() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (typeof message !== 'object' || !message.type) {
        console.error('Invalid message format:', message);
        return;
      }

      const handlers = this.handlers.get(message.type);
      if (!handlers) {
        console.warn(`No handlers registered for message type: ${message.type}`);
        return;
      }

      // Execute all handlers for this message type
      handlers.forEach(handler => {
        try {
          const result = handler(message, sender, sendResponse);
          if (result instanceof Promise) {
            result.catch(error => {
              console.error(`Error in message handler for ${message.type}:`, error);
            });
          }
        } catch (error) {
          console.error(`Error in message handler for ${message.type}:`, error);
        }
      });

      // Return true if we have async handlers
      return handlers.some(handler => 
        handler.toString().includes('async') || 
        handler.toString().includes('Promise')
      );
    });
  }

  addHandler(type: string, handler: MessageHandler) {
    const handlers = this.handlers.get(type) || [];
    handlers.push(handler);
    this.handlers.set(type, handlers);
  }

  removeHandler(type: string, handler: MessageHandler) {
    const handlers = this.handlers.get(type);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
        if (handlers.length === 0) {
          this.handlers.delete(type);
        } else {
          this.handlers.set(type, handlers);
        }
      }
    }
  }

  async sendMessage(type: string, data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type, data }, response => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response);
        }
      });
    });
  }

  async sendToContentScript(
    tabId: number,
    type: string,
    data?: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(tabId, { type, data }, response => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response);
        }
      });
    });
  }

  async broadcastToAllTabs(type: string, data?: any): Promise<void> {
    const tabs = await chrome.tabs.query({});
    const messagePromises = tabs.map(tab => {
      if (tab.id) {
        return this.sendToContentScript(tab.id, type, data).catch(error => {
          console.warn(`Failed to send message to tab ${tab.id}:`, error);
        });
      }
    });
    await Promise.all(messagePromises);
  }
}

export const messagingService = MessagingService.getInstance();

// Message type constants
export const MESSAGE_TYPES = {
  FILL_FORM: 'FILL_FORM',
  DETECT_FIELDS: 'DETECT_FIELDS',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  FETCH_DATA: 'FETCH_DATA',
  DATA_UPDATED: 'DATA_UPDATED',
  ERROR: 'ERROR',
} as const;
