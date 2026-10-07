document.querySelectorAll("[data-x-follow]").forEach((link) => {
  link.addEventListener("click", () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "x_follow", {
        event_label: "Xフォロー",
        placement: link.dataset.followPlacement || "unknown"
      });
    }
  });
});
