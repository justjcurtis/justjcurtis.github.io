const scrollAnimationObserver = new IntersectionObserver((entries, scrollAnimationObserver) =>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add('enter')
            scrollAnimationObserver.unobserve(entry);
        }
    })
});
export default{
    bind(el){
        el.classList.add('before-enter');
        scrollAnimationObserver.observe(el);
    }
}