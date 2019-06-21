export default ( wrapper: HTMLDivElement, relativeItem: HTMLElement ) => {

    const position = relativeItem.getBoundingClientRect();
    const styles = getComputedStyle( relativeItem );
    const placeholder = wrapper.querySelector( '.placeholder' ) as HTMLElement;

    const size = {
        width:  window.getComputedStyle( relativeItem ).width,
        height: window.getComputedStyle( relativeItem ).height
    };

    placeholder.style.transform = 'none';
    placeholder.innerHTML = relativeItem.outerHTML;

    wrapper.style.position = 'absolute';
    wrapper.style.top = position.top + 'px';
    wrapper.style.left = position.left + 'px';
    wrapper.style.height = size.height;
    wrapper.style.width = size.width;
    wrapper.style.margin = relativeItem.style.margin;
    wrapper.style.backgroundColor = styles.backgroundColor;
    wrapper.style.borderRadius = styles.borderRadius;
    wrapper.style.visibility = 'visible';
    wrapper.style.opacity = '1';

}
