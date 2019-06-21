export default ( wrapper: HTMLDivElement, placeholder: HTMLElement, relativeItem: HTMLElement ) => {

    const position = relativeItem.getBoundingClientRect();

    const styles = getComputedStyle( relativeItem );

    const size = {
        width:  window.getComputedStyle( relativeItem ).width,
        height: window.getComputedStyle( relativeItem ).height
    };

    placeholder.style.display = 'none';
    placeholder.style.transform = 'none';
    placeholder.innerHTML = relativeItem.outerHTML;

    const children = placeholder.children[ 0 ] as HTMLElement;
    children.style.transition = 'none';
    children.style.fontSize = styles.fontSize;
    children.style.transition = styles.transition;

    placeholder.style.display = styles.display;

    wrapper.style.display = 'none';
    wrapper.style.borderRadius = styles.borderRadius;
    wrapper.style.backgroundColor = styles.backgroundColor;
    wrapper.style.position = 'absolute';
    wrapper.style.top = position.top + 'px';
    wrapper.style.left = position.left + 'px';
    wrapper.style.height = size.height;
    wrapper.style.width = size.width;
    wrapper.style.visibility = 'visible';
    wrapper.style.opacity = '1';
    wrapper.style.display = 'block';

}
