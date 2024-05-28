class CustomSelector {
    selectContainer = undefined;
    listOptionsWrapper = undefined;
    listOptions = undefined;
    selectDisplay = undefined;

    nameSelectDataListOptionsWrapper = '[data-selector="list-option"]';
    nameSelectDataOption = '[data-selector="option"]';
    nameSelectDataDisplay = '[data-selector="text"]';

    constructor(selectContainer) {
        this.selectContainer = selectContainer;
        this.listOptionsWrapper = selectContainer.querySelector(this.nameSelectDataListOptionsWrapper);
        this.selectDisplay = selectContainer.querySelector(this.nameSelectDataDisplay);
        this.listOptions = [...this.listOptionsWrapper.querySelectorAll(this.nameSelectDataOption)];
        this.init();
    }


    hideOrShowListOptions(event) {
        event.stopPropagation();
        const dataAttribute = event.currentTarget.dataset;
        dataAttribute.status = dataAttribute.status === 'active' ? 'disabled' : 'active';
    }

    setTextToDisplaySelect(text) {
        this.selectDisplay.innerHTML = text;
    }

    setValueToSelect(value) {
        this.selectContainer.dataset.value = value;
    }

    setOptionActive(event) {
        const clickedOption = event.target.closest(this.nameSelectDataOption);
        const clickedOptionData = clickedOption.dataset;

        if (clickedOptionData.status === "active") return;


        this.listOptions.forEach((option) => {
            if (option === clickedOption) {
                option.dataset.status = "active";
                this.setTextToDisplaySelect(option.innerText);
                this.setValueToSelect(option.dataset.value);
            } else {
                delete option.dataset.status;
            }
        })
    }

    hideSelectByClickOnWindow() {
        if (this.selectContainer.dataset.status === 'active') {
            this.selectContainer.dataset.status = 'disabled';
        }
    }

    render() {
        const activeOption = this.listOptions.find(option => option.dataset.status === "active");
        if (activeOption === undefined) return;
        this.setTextToDisplaySelect(activeOption.innerText);
        this.setValueToSelect(activeOption.dataset.value);
    }

    init() {
        this.selectContainer.addEventListener('click', this.hideOrShowListOptions.bind(this));
        this.listOptionsWrapper.addEventListener('click', this.setOptionActive.bind(this));
        window.addEventListener('click', this.hideSelectByClickOnWindow.bind(this));
        this.render();

    }
}

document.addEventListener('DOMContentLoaded', () => {
    const option = document.querySelector('[data-selector="container"]');
    new CustomSelector(option)
});