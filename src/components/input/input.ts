import { fromEvent } from 'rxjs';
import Component, { ComponentProps } from '../../app/js/component';

export default class Input extends Component.Default {
    input: HTMLInputElement;
    name: string;
    value: string;
    required: boolean;
    onChange: () => void;

    constructor(element: ComponentProps, onChange: () => void) {
        super(element);

        this.input = this.nRoot.querySelector('input');
        this.name = this.input.name;
        this.value = this.input.value;
        this.required = this.input.hasAttribute('data-required');
        this.onChange = onChange;

        fromEvent(this.input, 'input').subscribe(this.onChangeInput);
    }

    getValue = () => this.input.value;

    onChangeInput = (e: Event) => {
        if (this.required) this.onChange();
        if ((<HTMLInputElement>e.target)?.value?.length) {
            this.nRoot.classList.add('fill');
        } else {
            this.nRoot.classList.remove('fill');
        }
    }

    destroy = () => {
        // Destroy functions
    }
}