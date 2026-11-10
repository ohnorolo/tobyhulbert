(function () {
  "use strict";

  var PER_GROUP = 10;
  var LIMIT = 20;
  var state = { filter: "all", expanded: false };

  var list = document.getElementById("credit-list");
  var toggle = document.getElementById("credit-toggle");
  var filterButtons = document.querySelectorAll("[data-filter]");
  var data = window.CREDITS || { film: [], records: [] };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined) { node.textContent = text; }
    return node;
  }

  function row(credit) {
    var li = el("li", "credit");
    li.appendChild(el("span", "credit-title", credit.title));
    li.appendChild(el("span", "credit-project", credit.project));
    li.appendChild(el("span", "credit-role", credit.role));
    if (credit.art) { li.setAttribute("data-art", "images/work/" + credit.art); }
    return li;
  }

  function group(label, credits, max) {
    var frag = document.createDocumentFragment();
    if (label) { frag.appendChild(el("li", "credit-heading", label)); }
    credits.slice(0, max).forEach(function (credit) { frag.appendChild(row(credit)); });
    return frag;
  }

  function render() {
    var total;
    list.textContent = "";
    if (state.filter === "all") {
      total = data.film.length + data.records.length;
      var max = state.expanded ? Infinity : PER_GROUP;
      list.appendChild(group("Film & TV", data.film, max));
      list.appendChild(group("Records", data.records, max));
    } else {
      var source = data[state.filter];
      total = source.length;
      list.appendChild(group("", source, state.expanded ? Infinity : LIMIT));
    }
    toggle.hidden = total <= LIMIT;
    toggle.textContent = state.expanded ? "Show fewer" : "Show all " + total + " credits";
    toggle.setAttribute("aria-expanded", state.expanded ? "true" : "false");
    filterButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-filter") === state.filter ? "true" : "false");
    });
  }

  filterButtons.forEach(function (button) {
    var key = button.getAttribute("data-filter");
    var count = key === "all" ? data.film.length + data.records.length : data[key].length;
    button.textContent = button.textContent + " " + count;
    button.addEventListener("click", function () {
      state.filter = key;
      state.expanded = false;
      render();
    });
  });

  toggle.addEventListener("click", function () {
    state.expanded = !state.expanded;
    render();
    if (!state.expanded) { document.getElementById("credits").scrollIntoView(); }
  });

  render();

  /* Cover art follows the pointer over a credit that has artwork. Mouse only. */
  var art = document.getElementById("credit-art");
  if (art && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var current = "";
    list.addEventListener("mousemove", function (event) {
      var li = event.target.closest ? event.target.closest(".credit") : null;
      var src = li ? li.getAttribute("data-art") : null;
      if (!src) { art.classList.remove("is-on"); return; }
      if (src !== current) { current = src; art.src = src; }
      var x = Math.min(event.clientX + 28, window.innerWidth - art.offsetWidth - 16);
      var y = Math.min(event.clientY - 40, window.innerHeight - art.offsetHeight - 16);
      art.style.transform = "translate(" + x + "px," + Math.max(16, y) + "px)";
      art.classList.add("is-on");
    });
    list.addEventListener("mouseleave", function () { art.classList.remove("is-on"); });
    art.addEventListener("error", function () { art.classList.remove("is-on"); });
  }

  /* Videos */
  var videoGrid = document.getElementById("video-grid");
  (window.VIDEOS || []).forEach(function (video) {
    var item = el("div", "video");
    var frame = el("div", "video-frame");
    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(video.id);
    iframe.title = video.title;
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    frame.appendChild(iframe);
    item.appendChild(frame);
    item.appendChild(el("p", "video-title", video.title));
    item.appendChild(el("p", "video-note", video.note));
    videoGrid.appendChild(item);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
