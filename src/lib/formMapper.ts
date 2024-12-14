export interface FieldMapping {
  selector: string;
  value: string;
  type?: string;
}

export class FormMapper {
  private static instance: FormMapper;

  private constructor() {}

  static getInstance(): FormMapper {
    if (!FormMapper.instance) {
      FormMapper.instance = new FormMapper();
    }
    return FormMapper.instance;
  }

  fillForm(mappings: Record<string, FieldMapping>, data: Record<string, any>): void {
    Object.entries(mappings).forEach(([key, mapping]) => {
      const elements = document.querySelectorAll(mapping.selector);
      const value = data[key];

      elements.forEach((element) => {
        if (element instanceof HTMLInputElement) {
          switch (element.type) {
            case 'checkbox':
              element.checked = Boolean(value);
              break;
            case 'radio':
              if (element.value === String(value)) {
                element.checked = true;
              }
              break;
            default:
              element.value = String(value);
          }
          // Trigger change event
          element.dispatchEvent(new Event('change', { bubbles: true }));
          element.dispatchEvent(new Event('input', { bubbles: true }));
        } else if (element instanceof HTMLSelectElement) {
          element.value = String(value);
          element.dispatchEvent(new Event('change', { bubbles: true }));
        } else if (element instanceof HTMLTextAreaElement) {
          element.value = String(value);
          element.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
    });
  }

  detectFormFields(): Record<string, FieldMapping> {
    const mappings: Record<string, FieldMapping> = {};
    const formElements = document.querySelectorAll('input, select, textarea');

    formElements.forEach((element) => {
      if (element instanceof HTMLInputElement ||
          element instanceof HTMLSelectElement ||
          element instanceof HTMLTextAreaElement) {
        
        const name = element.name || element.id;
        if (name) {
          mappings[name] = {
            selector: `[name="${name}"], #${name}`,
            value: '',
            type: element instanceof HTMLInputElement ? element.type : element.tagName.toLowerCase()
          };
        }
      }
    });

    return mappings;
  }
}
