import './styles/content.css';

interface FormField {
  element: HTMLInputElement | HTMLTextAreaElement;
  value: string;
  originalValue: string;
}

class FormFiller {
  private static instance: FormFiller;
  private dialog: HTMLDivElement | null = null;
  private overlay: HTMLDivElement | null = null;
  private notification: HTMLDivElement | null = null;
  private pendingChanges: Map<HTMLElement, FormField> = new Map();
  private icon: HTMLDivElement | null = null;

  private constructor() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeIcon());
    } else {
      this.initializeIcon();
    }
  }

  static getInstance(): FormFiller {
    if (!FormFiller.instance) {
      FormFiller.instance = new FormFiller();
    }
    return FormFiller.instance;
  }

  public initializeIcon() {
    // Remove existing icon if any
    this.icon?.remove();
    
    // Create new icon
    this.icon = document.createElement('div');
    this.icon.className = 'form-filler-icon';
    this.icon.innerHTML = '✏️';
    this.icon.title = '点击打开表单填充器';
    this.icon.addEventListener('click', () => this.showDialog());
    
    // Add to document
    document.body.appendChild(this.icon);

    // Ensure icon stays on top
    this.observeBodyChanges();
  }

  private observeBodyChanges() {
    const observer = new MutationObserver(() => {
      if (!document.body.contains(this.icon) && this.icon) {
        document.body.appendChild(this.icon);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private showDialog() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'form-filler-overlay';
    this.overlay.addEventListener('click', () => this.hideDialog());

    // Create dialog
    this.dialog = document.createElement('div');
    this.dialog.className = 'form-filler-dialog';
    this.dialog.addEventListener('click', (e) => e.stopPropagation());

    // Create content
    const title = document.createElement('h3');
    title.textContent = '表单填充器';
    title.style.margin = '0 0 15px 0';

    const input = document.createElement('textarea');
    input.className = 'form-filler-input';
    input.placeholder = '输入要填充的文本内容...\n例如：\n姓名: 张三\n年龄: 25';
    input.rows = 5;

    const fillButton = document.createElement('button');
    fillButton.className = 'form-filler-button';
    fillButton.textContent = '填充表单';
    fillButton.addEventListener('click', () => this.handleFill(input.value));

    const cancelButton = document.createElement('button');
    cancelButton.className = 'form-filler-button secondary';
    cancelButton.textContent = '取消';
    cancelButton.addEventListener('click', () => this.hideDialog());

    const closeButton = document.createElement('span');
    closeButton.className = 'form-filler-close';
    closeButton.innerHTML = '×';
    closeButton.addEventListener('click', () => this.hideDialog());

    // Assemble dialog
    this.dialog.appendChild(closeButton);
    this.dialog.appendChild(title);
    this.dialog.appendChild(input);
    this.dialog.appendChild(document.createElement('br'));
    this.dialog.appendChild(fillButton);
    this.dialog.appendChild(cancelButton);

    // Add to document
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.dialog);

    // Focus input
    input.focus();
  }

  private hideDialog() {
    this.overlay?.remove();
    this.dialog?.remove();
    this.overlay = null;
    this.dialog = null;
  }

  private handleFill(content: string) {
    this.hideDialog();
    const fields = this.findFormFields();
    
    // Try to match content with form fields
    fields.forEach(field => {
      const value = this.findMatchingValue(field.element, content);
      if (value && value !== field.element.value) {
        this.pendingChanges.set(field.element, {
          element: field.element,
          value,
          originalValue: field.element.value
        });
      }
    });

    if (this.pendingChanges.size > 0) {
      this.showNotification();
    }
  }

  private findFormFields(): FormField[] {
    const fields: FormField[] = [];
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    
    inputs.forEach(input => {
      if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
        fields.push({
          element: input,
          value: input.value,
          originalValue: input.value
        });
      }
    });

    return fields;
  }

  private findMatchingValue(element: HTMLElement, content: string): string | null {
    // Try to find a line that matches the field's label or placeholder
    const label = this.findFieldLabel(element);
    if (!label) return null;

    const lines = content.split('\n');
    for (const line of lines) {
      if (line.toLowerCase().includes(label.toLowerCase())) {
        const value = line.split(':')[1]?.trim();
        if (value) return value;
      }
    }

    return null;
  }

  private findFieldLabel(element: HTMLElement): string | null {
    // Try to find label by for attribute
    const id = element.getAttribute('id');
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label) return label.textContent?.trim() || null;
    }

    // Try to find label by proximity
    const parent = element.parentElement;
    if (parent) {
      const label = parent.querySelector('label');
      if (label) return label.textContent?.trim() || null;
    }

    // Try placeholder or aria-label
    return element.getAttribute('placeholder') || 
           element.getAttribute('aria-label') || 
           null;
  }

  private showNotification() {
    // Create notification
    this.notification = document.createElement('div');
    this.notification.className = 'form-filler-notification';

    const title = document.createElement('h4');
    title.textContent = '发现可填充的内容';
    title.style.margin = '0 0 10px 0';

    const message = document.createElement('div');
    message.textContent = `找到 ${this.pendingChanges.size} 个可以填充的字段。`;

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'form-filler-notification-buttons';

    const acceptButton = document.createElement('button');
    acceptButton.className = 'form-filler-button';
    acceptButton.textContent = '接受';
    acceptButton.addEventListener('click', () => this.applyChanges());

    const rejectButton = document.createElement('button');
    rejectButton.className = 'form-filler-button secondary';
    rejectButton.textContent = '放弃';
    rejectButton.addEventListener('click', () => this.hideNotification());

    buttonContainer.appendChild(acceptButton);
    buttonContainer.appendChild(rejectButton);

    this.notification.appendChild(title);
    this.notification.appendChild(message);
    this.notification.appendChild(buttonContainer);

    document.body.appendChild(this.notification);
  }

  private hideNotification() {
    this.notification?.remove();
    this.notification = null;
    this.pendingChanges.clear();
  }

  private applyChanges() {
    this.pendingChanges.forEach(field => {
      field.element.value = field.value;
      field.element.dispatchEvent(new Event('input', { bubbles: true }));
      field.element.dispatchEvent(new Event('change', { bubbles: true }));
    });
    this.hideNotification();
  }
}

// Initialize form filler
const formFiller = FormFiller.getInstance();

// Re-initialize when content script is injected
if (document.readyState === 'complete') {
  formFiller.initializeIcon();
}

// 监听来自扩展的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TAB_UPDATED') {
    // 检查是否是腾讯问卷页面
    if (window.location.href.includes('wj.qq.com')) {
      // 等待表单加载完成
      waitForForm().then(() => {
        console.log('Form detected on page');
        // 通知扩展表单已准备就绪
        chrome.runtime.sendMessage({ 
          type: 'FORM_READY',
          url: window.location.href 
        });
      });
    }
  } else if (message.type === 'FILL_FORM') {
    fillForm(message.data);
  }
});

// 等待表单元素加载
function waitForForm(): Promise<void> {
  return new Promise((resolve) => {
    const checkForm = () => {
      const form = document.querySelector('.question-wrapper');
      if (form) {
        resolve();
      } else {
        setTimeout(checkForm, 500);
      }
    };
    checkForm();
  });
}

// 填写表单
async function fillForm(formData: Record<string, string>) {
  try {
    // 等待表单加载
    await waitForForm();

    // 获取所有问题容器
    const questions = document.querySelectorAll('.question-wrapper');
    
    questions.forEach((question) => {
      // 获取问题标题
      const titleElement = question.querySelector('.question-title');
      if (!titleElement) return;
      
      const title = titleElement.textContent?.trim() || '';
      if (!title || !formData[title]) return;

      const value = formData[title];

      // 处理不同类型的问题
      // 单选题
      const radioInputs = question.querySelectorAll('input[type="radio"]');
      if (radioInputs.length > 0) {
        radioInputs.forEach((radio: Element) => {
          if (radio instanceof HTMLInputElement) {
            const label = radio.parentElement?.textContent?.trim();
            if (label === value) {
              radio.click();
            }
          }
        });
        return;
      }

      // 文本输入
      const textInput = question.querySelector('input[type="text"], textarea');
      if (textInput instanceof HTMLInputElement || textInput instanceof HTMLTextAreaElement) {
        textInput.value = value;
        textInput.dispatchEvent(new Event('input', { bubbles: true }));
        textInput.dispatchEvent(new Event('change', { bubbles: true }));
        return;
      }

      // 多选题
      const checkboxInputs = question.querySelectorAll('input[type="checkbox"]');
      if (checkboxInputs.length > 0) {
        const values = value.split(',').map(v => v.trim());
        checkboxInputs.forEach((checkbox: Element) => {
          if (checkbox instanceof HTMLInputElement) {
            const label = checkbox.parentElement?.textContent?.trim();
            if (label && values.includes(label)) {
              checkbox.click();
            }
          }
        });
        return;
      }

      // 下拉选择
      const select = question.querySelector('select');
      if (select instanceof HTMLSelectElement) {
        const options = Array.from(select.options);
        const option = options.find(opt => opt.text.trim() === value);
        if (option) {
          select.value = option.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
        return;
      }
    });

    console.log('Form filled successfully');
  } catch (error) {
    console.error('Error filling form:', error);
  }
}

// 导出一个空对象以满足模块要求
export {};
