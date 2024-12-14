/// <reference types="chrome" />

import { DataFetcher, DataSource } from '../lib/dataFetcher';
import { StorageManager } from '../lib/storageManager';

// 初始化 Service Worker
chrome.runtime.onInstalled.addListener(() => {
  console.log('Form Auto Filler extension installed');
});

// 创建消息处理器
const messageHandler = {
  async handleDataFetch(source: DataSource) {
    try {
      const dataFetcher = DataFetcher.getInstance();
      // const data = await dataFetcher.fetchFromApi(source.endpoint || '', source.authToken);
      const storageManager = StorageManager.getInstance();
      await storageManager.saveData({ lastUpdate: Date.now() });
      return { success: true, data: null };
    } catch (error) {
      console.error('Error fetching data:', error);
      return { success: false, error: String(error) };
    }
  },

  async handleFieldsDetected(data: any, tabId?: number) {
    try {
      const storageManager = StorageManager.getInstance();
      await storageManager.saveData({ mappings: data });
      if (tabId) {
        chrome.tabs.sendMessage(tabId, { type: 'FIELDS_UPDATED', data });
      }
      return { success: true };
    } catch (error) {
      console.error('Error handling fields:', error);
      return { success: false, error: String(error) };
    }
  }
};

// 设置消息监听器
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message:', message);

  const handleAsyncMessage = async () => {
    try {
      switch (message.type) {
        case 'FETCH_DATA':
          return await messageHandler.handleDataFetch(message.source);
        case 'FIELDS_DETECTED':
          return await messageHandler.handleFieldsDetected(message.data, sender.tab?.id);
        default:
          return { success: false, error: 'Unknown message type' };
      }
    } catch (error) {
      console.error('Error handling message:', error);
      return { success: false, error: String(error) };
    }
  };

  // 处理异步消息
  handleAsyncMessage()
    .then(response => sendResponse(response))
    .catch(error => sendResponse({ success: false, error: String(error) }));

  return true; // 保持消息通道开放
});

// 监听标签页更新
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    chrome.tabs.sendMessage(tabId, { type: 'TAB_UPDATED', url: tab.url })
      .catch(error => console.log('Tab not ready yet:', error));
  }
});

// 导出一个空对象以满足模块要求
export {};