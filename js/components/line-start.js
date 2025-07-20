class Start extends HTMLElement
{
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = 'START';
    }
}

customElements.define('line-start', Start);