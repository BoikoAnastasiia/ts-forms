class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElemet: HTMLDivElement;
  element: HTMLFormElement;

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
    this.attach();
  }
  private attach() {
    this.hostElemet.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
