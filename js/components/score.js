class Score extends HTMLElement
{
    connectedCallback() {
        this.render();
    }

    render() {
        // do something ...
    }
}

customElements.define('score-clip', Score);