class Finish extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = 'FINISH';
    }
}

customElements.define('line-finish', Finish);