const productCategories = ["All", "Chairs", "Tables", "Lounge", "Accessories", "Packages"];
const products = [
  { id: "banquet-chair", name: "Banquet Chair", category: "Chairs", description: "A timeless seat for receptions and celebrations.", image: "photo-1511795409834-ef04bbd61622" },
  { id: "conference-chair", name: "Conference Chair", category: "Chairs", description: "A considered choice for meetings and formal events.", image: "photo-1507504031003-b417219a0fde" },
  { id: "folding-chair", name: "Folding Chair", category: "Chairs", description: "Practical seating for gatherings of every size.", image: "photo-1519167758481-83f550bb49b3" },
  { id: "event-chair", name: "Elegant Event Chair", category: "Chairs", description: "An elevated finish for your special occasion.", image: "photo-1511795409834-ef04bbd61622" },
  { id: "round-table", name: "Round Dining Table", category: "Tables", description: "Bring guests together around one table.", image: "photo-1511795409834-ef04bbd61622" },
  { id: "rectangular-table", name: "Rectangular Table", category: "Tables", description: "Versatile space for dining, displays or planning.", image: "photo-1507504031003-b417219a0fde" },
  { id: "cocktail-table", name: "Cocktail Table", category: "Tables", description: "A natural gathering point for drinks and conversation.", image: "photo-1519167758481-83f550bb49b3" },
  { id: "conference-table", name: "Conference Table", category: "Tables", description: "A practical foundation for professional meetings.", image: "photo-1511795409834-ef04bbd61622" },
  { id: "event-sofa", name: "Event Sofa", category: "Lounge", description: "Create a welcoming place to pause and connect.", image: "photo-1600210492486-724fe5c67fb0" },
  { id: "occasional-chair", name: "Occasional Chair", category: "Lounge", description: "A comfortable accent for a relaxed setting.", image: "photo-1600210492486-724fe5c67fb0" },
  { id: "coffee-table", name: "Coffee Table", category: "Lounge", description: "A useful finishing touch for your lounge area.", image: "photo-1600210492486-724fe5c67fb0" },
  { id: "table-linen", name: "Table Linen", category: "Accessories", description: "Dress your tables for a polished event setting.", image: "photo-1511795409834-ef04bbd61622" },
  { id: "table-decor", name: "Table Decorations", category: "Accessories", description: "Details to help bring your table arrangement together.", image: "photo-1519167758481-83f550bb49b3" },
  { id: "wedding-package", name: "Wedding Package", category: "Packages", description: "A starting point for your reception furniture enquiry.", image: "photo-1511795409834-ef04bbd61622" },
  { id: "birthday-package", name: "Birthday Package", category: "Packages", description: "Furniture options for a celebration with your guests.", image: "photo-1519167758481-83f550bb49b3" },
  { id: "corporate-package", name: "Corporate Package", category: "Packages", description: "A practical collection for professional gatherings.", image: "photo-1507504031003-b417219a0fde" },
  { id: "party-package", name: "Party Package", category: "Packages", description: "Start planning your private party furniture needs.", image: "photo-1511795409834-ef04bbd61622" }
];
const galleryItems = [
  { title: "An evening to remember", category: "Weddings", image: "photo-1519167758481-83f550bb49b3" },
  { title: "A table set for gathering", category: "Weddings", image: "photo-1511795409834-ef04bbd61622" },
  { title: "A place to connect", category: "Corporate", image: "photo-1507504031003-b417219a0fde" },
  { title: "Room to celebrate", category: "Celebrations", image: "photo-1519167758481-83f550bb49b3" },
  { title: "An easy outdoor setting", category: "Outdoor", image: "photo-1511795409834-ef04bbd61622" },
  { title: "Details around the table", category: "Weddings", image: "photo-1600210492486-724fe5c67fb0" },
  { title: "A colourful celebration", category: "Celebrations", image: "photo-1507504031003-b417219a0fde" }
];
const imageUrl = (id, width = 720) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=78`;
const cart = new Map();
let activeProductCategory = "All";
let activeGalleryCategory = "All";

const productGrid = document.querySelector("#product-grid");
const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const formStatus = document.querySelector("#form-status");
const enquiryForm = document.querySelector("#enquiry-form");

function renderFilterButtons(container, options, selected, onSelect, label) {
  container.innerHTML = options.map((option) => `<button class="filter-button" type="button" aria-pressed="${option === selected}" data-filter="${option}">${option}</button>`).join("");
  container.setAttribute("aria-label", label);
  container.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-filter]");
    if (!button) return;
    onSelect(button.dataset.filter);
  });
}

function renderProducts() {
  const search = document.querySelector("#product-search").value.trim().toLowerCase();
  const visible = products.filter((product) => (activeProductCategory === "All" || product.category === activeProductCategory)
    && `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(search));
  document.querySelector("#product-result-count").textContent = `${visible.length} ${visible.length === 1 ? "item" : "items"}`;
  productGrid.innerHTML = visible.length ? visible.map((product) => `
    <article class="product-card">
      <div class="product-photo"><img src="${imageUrl(product.image)}" alt="${product.name} arranged for an event" loading="lazy"><span class="product-category">${product.category}</span></div>
      <div class="product-info"><h3>${product.name}</h3><p>${product.description}</p><span class="product-price">Price on request</span>
        <div class="product-actions"><label class="visually-hidden" for="quantity-${product.id}">Quantity for ${product.name}</label><input class="quantity-input" id="quantity-${product.id}" type="number" min="1" max="999" value="1" inputmode="numeric"><button class="add-button" type="button" data-add="${product.id}">Add to enquiry</button></div>
      </div>
    </article>`).join("") : '<p class="no-results">No items match that search. Try a different name or category.</p>';
}

function renderCart() {
  const total = [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = `(${total})`;
  if (!cart.size) {
    cartItems.innerHTML = '<p class="empty-cart">Your list is empty. Add a few pieces from the collection to get started.</p>';
    return;
  }
  cartItems.innerHTML = [...cart.values()].map(({ product, quantity }) => `
    <div class="cart-line" data-cart-line="${product.id}"><div><strong>${product.name}</strong><small>${product.category} · Price on request</small></div>
      <div class="cart-quantity"><button type="button" data-decrease="${product.id}" aria-label="Decrease ${product.name} quantity">−</button><output aria-label="Quantity">${quantity}</output><button type="button" data-increase="${product.id}" aria-label="Increase ${product.name} quantity">+</button></div>
      <button class="remove-item" type="button" data-remove="${product.id}" aria-label="Remove ${product.name}">×</button></div>`).join("");
}

function setFormMessage(message, isError = false) {
  formStatus.textContent = message;
  formStatus.classList.toggle("is-error", isError);
}

renderFilterButtons(document.querySelector("#product-filters"), productCategories, activeProductCategory, (category) => {
  activeProductCategory = category;
  document.querySelectorAll("#product-filters [data-filter]").forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.filter === category)));
  renderProducts();
}, "Filter products");
document.querySelector("#product-search").addEventListener("input", renderProducts);
productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  const product = products.find((item) => item.id === button.dataset.add);
  const quantityInput = document.querySelector(`#quantity-${product.id}`);
  const quantity = Number.parseInt(quantityInput.value, 10);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 999) {
    quantityInput.setCustomValidity("Enter a quantity from 1 to 999.");
    quantityInput.reportValidity();
    return;
  }
  quantityInput.setCustomValidity("");
  const current = cart.get(product.id);
  cart.set(product.id, { product, quantity: Math.min(999, (current?.quantity ?? 0) + quantity) });
  renderCart();
  setFormMessage(`${product.name} added to your enquiry list.`);
});
cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-increase], button[data-decrease], button[data-remove]");
  if (!button) return;
  const id = button.dataset.increase || button.dataset.decrease || button.dataset.remove;
  const item = cart.get(id);
  if (!item) return;
  if (button.dataset.remove || (button.dataset.decrease && item.quantity === 1)) cart.delete(id);
  else item.quantity = Math.min(999, item.quantity + (button.dataset.increase ? 1 : -1));
  renderCart();
});

const galleryCategories = ["All", "Weddings", "Corporate", "Celebrations", "Outdoor"];
const galleryGrid = document.querySelector("#gallery-grid");
function renderGallery() {
  const visible = galleryItems.filter((item) => activeGalleryCategory === "All" || item.category === activeGalleryCategory);
  galleryGrid.innerHTML = visible.length ? visible.map((item) => `<button class="gallery-item" type="button" data-title="${item.title}" data-image="${imageUrl(item.image, 1400)}"><img src="${imageUrl(item.image)}" alt="${item.title}" loading="lazy"><span>${item.title}</span></button>`).join("") : '<p class="gallery-empty">More inspiration is coming soon.</p>';
}
renderFilterButtons(document.querySelector("#gallery-filters"), galleryCategories, activeGalleryCategory, (category) => {
  activeGalleryCategory = category;
  document.querySelectorAll("#gallery-filters [data-filter]").forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.filter === category)));
  renderGallery();
}, "Filter gallery images");
galleryGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".gallery-item");
  if (!button) return;
  const lightbox = document.querySelector("#lightbox");
  document.querySelector("#lightbox-image").src = button.dataset.image;
  document.querySelector("#lightbox-image").alt = button.dataset.title;
  document.querySelector("#lightbox-caption").textContent = button.dataset.title;
  if (typeof lightbox.showModal === "function") lightbox.showModal();
});
document.querySelector(".lightbox-close").addEventListener("click", () => document.querySelector("#lightbox").close());
document.querySelector("#lightbox").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});

const configNumber = String(window.GROWTH_CONFIG?.whatsappNumber ?? "").replace(/\D/g, "");
const whatsappReady = /^\d{8,15}$/.test(configNumber) && !/^0+$/.test(configNumber);
const genericMessage = "Hello GROWTH, I am interested in renting furniture for an upcoming event. Please assist me with a quotation.";
const whatsappLink = document.querySelector("#whatsapp-link");
if (whatsappReady) {
  whatsappLink.href = `https://wa.me/${configNumber}?text=${encodeURIComponent(genericMessage)}`;
  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
} else {
  whatsappLink.addEventListener("click", (event) => {
    event.preventDefault();
    setFormMessage("WhatsApp is not configured yet. Add your business number in business-config.js to enable contact.", true);
    document.querySelector("#enquiry").scrollIntoView({ behavior: "smooth" });
  });
}

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  setFormMessage("");
  if (!enquiryForm.reportValidity()) {
    setFormMessage("Please complete all required fields with valid details.", true);
    enquiryForm.querySelector(":invalid")?.focus();
    return;
  }
  if (!cart.size) {
    setFormMessage("Add at least one item to your enquiry list before continuing.", true);
    document.querySelector("#furniture").scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (!whatsappReady) {
    setFormMessage("Your details are ready, but WhatsApp is not configured. Add your business number in business-config.js before sending.", true);
    return;
  }
  const data = new FormData(enquiryForm);
  const selectedItems = [...cart.values()].map(({ product, quantity }) => `- ${product.name} (${quantity})`).join("\n");
  const message = [
    "Hello GROWTH, I would like to request a furniture rental quotation.",
    "", "ENQUIRY ITEMS", selectedItems,
    "", "EVENT DETAILS",
    `Name: ${data.get("name")}`, `Phone: ${data.get("phone")}`, `Email: ${data.get("email")}`,
    `Event: ${data.get("eventType")}`, `Date: ${data.get("eventDate")}`, `Location: ${data.get("location")}`,
    `Additional requirements: ${data.get("requirements") || "None provided"}`,
    "", "I understand this is a quote request and not a confirmed booking."
  ].join("\n");
  const opened = window.open(`https://wa.me/${configNumber}?text=${encodeURIComponent(message)}`, "_blank");
  if (opened) {
    opened.opener = null;
    setFormMessage("WhatsApp opened with your enquiry prepared. Review and press Send in WhatsApp to deliver it.");
  }
  else setFormMessage(`Your enquiry is ready, but the browser blocked the WhatsApp window. Open this link to continue: https://wa.me/${configNumber}`, true);
});

const menuButton = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  menuButton.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  primaryNav.classList.toggle("is-open", !expanded);
});
primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    primaryNav.classList.remove("is-open");
  }
});
const backTop = document.querySelector(".back-top");
window.addEventListener("scroll", () => backTop.classList.toggle("is-visible", window.scrollY > 600), { passive: true });
document.querySelector("#year").textContent = new Date().getFullYear();
renderProducts();
renderGallery();
renderCart();