document.addEventListener("DOMContentLoaded", () => {
    // Add shadow effects to images
    const images = document.querySelectorAll("img");
    images.forEach(image => {
        image.style.transition = "box-shadow 0.3s ease-in-out";
        image.addEventListener("mouseover", () => {
            image.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
        });
        image.addEventListener("mouseout", () => {
            image.style.boxShadow = "none";
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth"
            });
        });
    });

    // Animate elements on scroll
    const elementsToAnimate = document.querySelectorAll(".hero-text, .whats-inside .text, .testimonials, .author .text");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});
 
