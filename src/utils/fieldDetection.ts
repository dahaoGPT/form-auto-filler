interface FieldInfo {
  name: string;
  type: string;
  selector: string;
  label?: string;
  required?: boolean;
}

export function detectFormFields(form: HTMLFormElement): FieldInfo[] {
  const fields: FieldInfo[] = [];
  const formElements = form.querySelectorAll('input, select, textarea');

  formElements.forEach((element) => {
    if (element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement) {

      // Try to find associated label
      let label: string | undefined;
      const id = element.id;
      if (id) {
        const labelElement = document.querySelector(`label[for="${id}"]`);
        label = labelElement?.textContent?.trim();
      }

      // Get field name from name attribute or id
      const name = element.name || element.id;
      if (!name) return; // Skip fields without identifiers

      fields.push({
        name,
        type: element instanceof HTMLInputElement ? element.type : element.tagName.toLowerCase(),
        selector: `[name="${name}"], #${name}`,
        label,
        required: element.required
      });
    }
  });

  return fields;
}

export function inferFieldType(fieldName: string, value: string): string {
  // Common field name patterns
  const patterns = {
    email: /email|e-mail/i,
    phone: /phone|tel|mobile/i,
    name: /name|fullname|firstname|lastname/i,
    date: /date|birthday|dob/i,
    password: /password|pwd/i,
    url: /url|website|site/i,
    number: /number|age|quantity|amount/i
  };

  for (const [type, pattern] of Object.entries(patterns)) {
    if (pattern.test(fieldName)) {
      return type;
    }
  }

  // Try to infer type from value format
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return 'email';
  if (/^\d+$/.test(value)) return 'number';
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'date';
  if (/^https?:\/\//.test(value)) return 'url';
  
  return 'text';
}

export function validateFieldValue(value: string, type: string): boolean {
  const validators: Record<string, RegExp> = {
    email: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
    phone: /^\+?[\d\s-()]{8,}$/,
    url: /^https?:\/\/.+\..+/,
    date: /^\d{4}-\d{2}-\d{2}$/,
    number: /^\d+$/
  };

  const validator = validators[type];
  if (!validator) return true; // No validation for unknown types
  return validator.test(value);
}

export function suggestFieldMapping(
  sourceFields: Record<string, any>,
  formFields: FieldInfo[]
): Record<string, string> {
  const mapping: Record<string, string> = {};
  const sourceFieldNames = Object.keys(sourceFields);

  formFields.forEach(formField => {
    // Try exact match first
    let match = sourceFieldNames.find(
      sourceName => sourceName.toLowerCase() === formField.name.toLowerCase()
    );

    // If no exact match, try partial match
    if (!match) {
      match = sourceFieldNames.find(sourceName => {
        const sourceWords = sourceName.toLowerCase().split(/[_\s-]/);
        const fieldWords = formField.name.toLowerCase().split(/[_\s-]/);
        return sourceWords.some(word => fieldWords.includes(word));
      });
    }

    if (match) {
      mapping[formField.name] = match;
    }
  });

  return mapping;
}
