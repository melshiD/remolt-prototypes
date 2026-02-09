/**
 * Schema Form Engine
 * Dynamically generates forms from compatibility JSON schema
 */

class SchemaFormEngine {
    constructor(schema) {
        this.schema = schema;
        this.formData = {};
    }

    renderForm(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        this.schema.fields.forEach(field => {
            const fieldElement = this.createField(field);
            container.appendChild(fieldElement);
        });
    }

    createField(field) {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = `form-field ${field.required ? 'required' : ''}`;
        fieldDiv.dataset.fieldId = field.id;

        // Label
        const label = document.createElement('label');
        label.textContent = field.label;
        label.setAttribute('for', field.id);
        fieldDiv.appendChild(label);

        // Description
        if (field.description) {
            const desc = document.createElement('div');
            desc.className = 'description';
            desc.textContent = field.description;
            fieldDiv.appendChild(desc);
        }

        // Field input based on type
        let inputElement;
        switch (field.type) {
            case 'multiselect':
                inputElement = this.createMultiselect(field);
                break;
            case 'radio':
                inputElement = this.createRadio(field);
                break;
            case 'slider':
                inputElement = this.createSlider(field);
                break;
            case 'textarea':
                inputElement = this.createTextarea(field);
                break;
            default:
                inputElement = this.createTextInput(field);
        }

        fieldDiv.appendChild(inputElement);
        return fieldDiv;
    }

    createMultiselect(field) {
        const container = document.createElement('div');
        container.className = 'checkbox-group';

        field.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'checkbox-option';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `${field.id}_${index}`;
            checkbox.name = field.id;
            checkbox.value = option.value;

            const label = document.createElement('label');
            label.setAttribute('for', `${field.id}_${index}`);
            label.textContent = option.label;

            optionDiv.appendChild(checkbox);
            optionDiv.appendChild(label);
            container.appendChild(optionDiv);

            // Make the whole div clickable
            optionDiv.addEventListener('click', (e) => {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
            });
        });

        return container;
    }

    createRadio(field) {
        const container = document.createElement('div');
        container.className = 'radio-group';

        field.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'radio-option';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.id = `${field.id}_${index}`;
            radio.name = field.id;
            radio.value = option.value;
            if (field.required) radio.required = true;

            const label = document.createElement('label');
            label.setAttribute('for', `${field.id}_${index}`);
            label.textContent = option.label;

            optionDiv.appendChild(radio);
            optionDiv.appendChild(label);
            container.appendChild(optionDiv);

            // Make the whole div clickable
            optionDiv.addEventListener('click', (e) => {
                if (e.target !== radio) {
                    radio.checked = true;
                }
            });
        });

        return container;
    }

    createSlider(field) {
        const container = document.createElement('div');
        container.className = 'slider-container';

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.className = 'slider';
        slider.id = field.id;
        slider.name = field.id;
        slider.min = field.min;
        slider.max = field.max;
        slider.value = Math.floor((field.min + field.max) / 2);

        const labelsDiv = document.createElement('div');
        labelsDiv.className = 'slider-labels';
        
        const minLabel = document.createElement('span');
        minLabel.textContent = field.minLabel || field.min;
        
        const maxLabel = document.createElement('span');
        maxLabel.textContent = field.maxLabel || field.max;

        labelsDiv.appendChild(minLabel);
        labelsDiv.appendChild(maxLabel);

        container.appendChild(slider);
        container.appendChild(labelsDiv);

        return container;
    }

    createTextarea(field) {
        const textarea = document.createElement('textarea');
        textarea.id = field.id;
        textarea.name = field.id;
        textarea.placeholder = field.placeholder || '';
        if (field.required) textarea.required = true;
        if (field.maxLength) {
            textarea.maxLength = field.maxLength;
            textarea.placeholder += ` (max ${field.maxLength} characters)`;
        }
        return textarea;
    }

    createTextInput(field) {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = field.id;
        input.name = field.id;
        input.placeholder = field.placeholder || '';
        if (field.required) input.required = true;
        return input;
    }

    collectFormData() {
        const formData = {};

        this.schema.fields.forEach(field => {
            const fieldId = field.id;

            switch (field.type) {
                case 'multiselect':
                    const checkboxes = document.querySelectorAll(`input[name="${fieldId}"]:checked`);
                    formData[fieldId] = Array.from(checkboxes).map(cb => cb.value);
                    break;

                case 'radio':
                    const radio = document.querySelector(`input[name="${fieldId}"]:checked`);
                    formData[fieldId] = radio ? radio.value : null;
                    break;

                case 'slider':
                    const slider = document.getElementById(fieldId);
                    formData[fieldId] = parseInt(slider.value);
                    break;

                case 'textarea':
                case 'text':
                default:
                    const input = document.getElementById(fieldId);
                    formData[fieldId] = input ? input.value : '';
            }
        });

        return formData;
    }

    calculateCompatibility(profile1, profile2) {
        let totalWeight = 0;
        let weightedScore = 0;

        this.schema.fields.forEach(field => {
            if (field.weight === 0) return; // Skip fields that don't contribute to matching

            const weight = field.weight;
            totalWeight += weight;

            const value1 = profile1[field.id];
            const value2 = profile2[field.id];

            let fieldScore = 0;

            switch (field.type) {
                case 'multiselect':
                    // Calculate overlap between arrays
                    if (Array.isArray(value1) && Array.isArray(value2)) {
                        const intersection = value1.filter(v => value2.includes(v));
                        const union = [...new Set([...value1, ...value2])];
                        fieldScore = union.length > 0 ? intersection.length / union.length : 0;
                    }
                    break;

                case 'radio':
                    // Exact match = 1, no match = 0
                    fieldScore = value1 === value2 ? 1 : 0;
                    break;

                case 'slider':
                    // Inverse of normalized distance
                    const range = field.max - field.min;
                    const distance = Math.abs(value1 - value2);
                    fieldScore = 1 - (distance / range);
                    break;

                default:
                    fieldScore = 0;
            }

            weightedScore += fieldScore * weight;
        });

        return totalWeight > 0 ? weightedScore / totalWeight : 0;
    }
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SchemaFormEngine;
}
