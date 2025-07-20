class Player extends HTMLElement
{
    connectedCallback() {
        this.render();
    }

    render() {
        // do something ...
    }
    
}

customElements.define('player-name', Player);