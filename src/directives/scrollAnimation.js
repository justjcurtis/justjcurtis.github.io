const scrollAnimationObserver = new IntersectionObserver((entries, scrollAnimationObserver) =>{
    entries.forEach(entry=>{
        if(entry.intersectionRatio > 0){
            entry.target.classList.add('enter')
            scrollAnimationObserver.unobserve(entry.target);
        }
    })
});
export default{
    bind(el){
        el.classList.add('before-enter');
        scrollAnimationObserver.observe(el);
    }
}