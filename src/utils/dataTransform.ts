export interface TransformRule {
  type: 'format' | 'replace' | 'split' | 'join' | 'custom';
  params?: any;
  customFn?: (value: any) => any;
}

export class DataTransformer {
  private static instance: DataTransformer;

  private constructor() {}

  static getInstance(): DataTransformer {
    if (!DataTransformer.instance) {
      DataTransformer.instance = new DataTransformer();
    }
    return DataTransformer.instance;
  }

  transform(value: any, rules: TransformRule[]): any {
    return rules.reduce((result, rule) => {
      switch (rule.type) {
        case 'format':
          return this.formatValue(result, rule.params);
        case 'replace':
          return this.replaceValue(result, rule.params);
        case 'split':
          return this.splitValue(result, rule.params);
        case 'join':
          return this.joinValue(result, rule.params);
        case 'custom':
          return rule.customFn ? rule.customFn(result) : result;
        default:
          return result;
      }
    }, value);
  }

  private formatValue(value: any, format: string): string {
    if (typeof value === 'undefined' || value === null) return '';

    switch (format) {
      case 'date':
        return this.formatDate(value);
      case 'phone':
        return this.formatPhone(value);
      case 'currency':
        return this.formatCurrency(value);
      default:
        return String(value);
    }
  }

  private formatDate(value: string | Date): string {
    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  }

  private formatPhone(value: string): string {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX for US numbers
    if (numbers.length === 10) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    }
    
    return value;
  }

  private formatCurrency(value: number | string): string {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  private replaceValue(value: string, params: { pattern: string | RegExp, replacement: string }): string {
    if (typeof value !== 'string') return String(value);
    const pattern = typeof params.pattern === 'string' ? new RegExp(params.pattern, 'g') : params.pattern;
    return value.replace(pattern, params.replacement);
  }

  private splitValue(value: string, separator: string | RegExp): string[] {
    if (typeof value !== 'string') return [String(value)];
    return value.split(separator);
  }

  private joinValue(value: any[], separator: string): string {
    if (!Array.isArray(value)) return String(value);
    return value.join(separator);
  }
}

// Helper functions for common transformations
export const transformers = {
  capitalize: (value: string) => {
    if (typeof value !== 'string') return value;
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  },

  titleCase: (value: string) => {
    if (typeof value !== 'string') return value;
    return value
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },

  trim: (value: string) => {
    if (typeof value !== 'string') return value;
    return value.trim();
  },

  normalizeEmail: (value: string) => {
    if (typeof value !== 'string') return value;
    return value.toLowerCase().trim();
  },

  normalizePhone: (value: string) => {
    if (typeof value !== 'string') return value;
    return value.replace(/\D/g, '');
  }
};
