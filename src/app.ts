//validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(input: Validatable) {
  let isValid = true;
  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0;
  }
  if (input.minLength != null && typeof input.value === 'string') {
    isValid = isValid && input.value.length > input.minLength;
    console.log('input.minLength', isValid);
  }
  if (input.maxLength != null && typeof input.value === 'string') {
    isValid = isValid && input.value.length < input.maxLength;
    console.log('input.maxLength', isValid);
  }
  if (input.min != null) {
    isValid = isValid && +input.value > +input.min;
    console.log('input.min', isValid);
  }
  if (input.max != null) {
    isValid = isValid && +input.value < +input.max;
    console.log('input.max', isValid);
  }
  console.log('isvalid final', isValid);
  return isValid;
}

//autobind decorator
function autoBind(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDecroptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return originalMethod.bind(this);
    },
  };
  return adjDecroptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElemet: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById('project-input')!
    );
    this.hostElemet = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector(
      '#title'
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      '#people'
    )! as HTMLInputElement;
    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) | !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('invalid input, please try again');
    }
    return [enteredTitle, enteredDescription, +enteredPeople];
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    this.clearInputs();
    console.log(userInput);
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElemet.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
