import Component, { ComponentProps, getComponent, getComponents } from '../../app/js/component';
import FormButton from '../form-button/form-button';
import Input from '../input/input';

export default class Form extends Component.Default {
    nInputs: Input[];
    nFormButton: FormButton;

    constructor(element: ComponentProps) {
        super(element);

        this.nInputs = getComponents('input', this.nRoot).map(component => new Input(component, this.updateButton));
        this.nFormButton = new FormButton(getComponent('form-button', this.nRoot));
        this.nRoot.addEventListener('submit', this.onSubmit);
    }

        updateButton = () => {
            const state = this.nInputs.every(item => {
                if (item.required) return !!item.getValue();
                return true;
            });
            this.nFormButton.setDisabled(!state);
        }
        // updateButton = () => {
        //     this.nFormButton.setDisabled(this.nInputs.every(item => {
        //         if (item.required) return item.getValue();
        //         return true;
        //     }));
        // }
        
        onSubmit = (e: Event)=>{
            e.preventDefault();

            const emailTemplate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            let data : {
                [index: string]: string;
            } = {};
            this.nInputs.forEach(item => {
                data[item.name] = item.getValue();
            });
            emailTemplate.test(data['email']) ? console.log(data) : console.log('error');
      
    }

    destroy = () => {
        // Destroy functions
    }
}