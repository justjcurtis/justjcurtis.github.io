const landerTriggerObserver = new IntersectionObserver(
    (entries, landerTriggerObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                var e = new Event('landed');
                entry.target.dispatchEvent(e);
                landerTriggerObserver.unobserve(entry.target);
            }
        })
    });
export default {
    bind(el) {
        el.classList.add('lander-trigger');
        landerTriggerObserver.observe(el);
    }
}