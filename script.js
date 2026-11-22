/**
 * AURA BISTRÓ & BRASAS - LÓGICA INTERACTIVA
 * 100% JavaScript Nativo (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. BASE DE DATOS DEL MENÚ (SIN DEPENDENCIAS DE IMÁGENES)
  // ==========================================================================
  const menuItems = [
    {
      id: 1,
      name: "Carpaccio de Res Ahumada",
      category: "entradas",
      price: 42000,
      desc: "Láminas finas de lomo curado al frío, emulsión de trufa blanca, alcaparras crocantes y lascas de pecorino madurado 24 meses.",
      badges: ["Recomendación", "Sin Gluten"],
      pairing: "Maridaje sugerido: Pinot Noir Reserva"
    },
    {
      id: 2,
      name: "Burrata Rústica a la Leña",
      category: "entradas",
      price: 38000,
      desc: "Burrata cremosa sobre emulsión de tomates cherry confitados al carbón, pesto de albahaca morada y reducción de balsámico añejo.",
      badges: ["Vegetariano"],
      pairing: "Maridaje sugerido: Sauvignon Blanc Frío"
    },
    {
      id: 3,
      name: "Tartar de Atún Rojo & Aguacate",
      category: "entradas",
      price: 46000,
      desc: "Atún aleta amarilla cortado a cuchillo, emulsión de sésamo tostado, emulsión de ají amarillo y teja de arroz inflado.",
      badges: ["Fresco", "Sin Gluten"],
      pairing: "Maridaje sugerido: Vino Rosado de Provenza"
    },
    {
      id: 4,
      name: "Ojo de Bife Angus 400g",
      category: "brasas",
      price: 89000,
      desc: "Corte Prime madurado 35 días en seco, asado a las brasas de encina con mantequilla avellanada de romero y sal marina en escamas.",
      badges: ["Especial del Chef"],
      pairing: "Maridaje sugerido: Malbec Gran Reserva"
    },
    {
      id: 5,
      name: "Costillas Glaseadas al Bourbon",
      category: "brasas",
      price: 68000,
      desc: "Cocción lenta de 14 horas al humo de manzano, laqueadas con reducción de bourbon y miel silvestre, acompañadas de puré rústico.",
      badges: ["Favorito"],
      pairing: "Maridaje sugerido: Cerveza Artesanal Porter"
    },
    {
      id: 6,
      name: "Lomo en Reducción de Oporto & Hongos",
      category: "brasas",
      price: 74000,
      desc: "Medallón de solomillo sellado a fuego vivo, demiglace de hongos de bosque al vino oporto y vegetales caramelizados.",
      badges: ["Clásico"],
      pairing: "Maridaje sugerido: Cabernet Sauvignon"
    },
    {
      id: 7,
      name: "Pulpo Caramelizado a la Brasa",
      category: "mar",
      price: 76000,
      desc: "Tentáculo de pulpo tierno sobre parmentier de papa criolla al azafrán, emulsión de pimentón de la Vera y aceite de oliva virgen extra.",
      badges: ["Especial del Chef", "Sin Gluten"],
      pairing: "Maridaje sugerido: Albariño sobre lías"
    },
    {
      id: 8,
      name: "Salmón Noruego en Costra de Pistacho",
      category: "mar",
      price: 64000,
      desc: "Filete fresco con costra crocante de frutos secos, risotto perfumado al limón eureka y espárragos glaseados a la manteca.",
      badges: ["Ligero"],
      pairing: "Maridaje sugerido: Chardonnay con Barrica"
    },
    {
      id: 9,
      name: "Volcán Tibio de Chocolate 70%",
      category: "postres",
      price: 26000,
      desc: "Bizcocho fluido de cacao de origen, corazón fundido, flor de sal marina y helado artesanal de vainilla bourbon.",
      badges: ["Dulce Firma"],
      pairing: "Maridaje sugerido: Oporto Tawny 10 Años"
    },
    {
      id: 10,
      name: "Tarta Tatín de Manzanas Asadas",
      category: "postres",
      price: 24000,
      desc: "Hojaldre invertido con manzanas caramelizadas a la canela y toffee de mantequilla salada.",
      badges: ["Artesanal"],
      pairing: "Maridaje sugerido: Café Espresso Especial"
    },
    {
      id: 11,
      name: "Negroni Ahumado de la Casa",
      category: "cocteles",
      price: 38000,
      desc: "Gin botánico artesanal, Vermouth Rosso macerado en roble, Campari y humo capturado de hojas de romero fresco.",
      badges: ["Autor"],
      pairing: "Aperitivo insignia"
    },
    {
      id: 12,
      name: "Bramble Silvestre & Lavanda",
      category: "cocteles",
      price: 34000,
      desc: "Gin infusionado con moras del bosque, cordial de lavanda hecho en casa, limón fresco y toque espumante.",
      badges: ["Refrescante"],
      pairing: "Ideal para iniciar"
    }
  ];

  // ==========================================================================
  // 2. ESTADO DEL PEDIDO (CARRITO)
  // ==========================================================================
  let cart = [];

  // ==========================================================================
  // 3. REFERENCIAS DEL DOM
  // ==========================================================================
  const menuGrid = document.getElementById('menuGrid');
  const menuCategories = document.getElementById('menuCategories');
  const menuSearch = document.getElementById('menuSearch');
  
  // Drawer Carrito
  const openCartBtn = document.getElementById('openCartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartCount = document.getElementById('cartCount');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartTip = document.getElementById('cartTip');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const clearCartBtn = document.getElementById('clearCartBtn');

  // Reservas
  const reservationForm = document.getElementById('reservationForm');
  const resGuestsInput = document.getElementById('resGuests');
  const guestsCountDisplay = document.getElementById('guestsCountDisplay');
  const decreaseGuestsBtn = document.getElementById('decreaseGuests');
  const increaseGuestsBtn = document.getElementById('increaseGuests');
  const resDateInput = document.getElementById('resDate');
  const reservationModalBackdrop = document.getElementById('reservationModalBackdrop');
  const reservationTicket = document.getElementById('reservationTicket');
  const closeResModalBtn = document.getElementById('closeResModalBtn');

  // Menú móvil y barra
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.getElementById('navbar');
  const liveStatusText = document.getElementById('liveStatusText');

  // ==========================================================================
  // 4. FORMATEO DE MONEDA
  // ==========================================================================
  function formatMoney(amount) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount);
  }

  // ==========================================================================
  // 5. ESTADO EN VIVO DEL HORARIO DEL RESTAURANTE
  // ==========================================================================
  function updateRestaurantStatus() {
    const now = new Date();
    const day = now.getDay(); // 0 = Domingo, 1 = Lunes, etc.
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hour + minutes / 60;

    const liveDot = document.querySelector('.live-dot');

    if (day === 1) { // Lunes cerrado
      liveStatusText.textContent = "Cerrado hoy lunes • Mantenimiento de cavas y cocina";
      if (liveDot) liveDot.classList.add('closed');
      return;
    }

    // Horarios: 13:00 - 16:30 y 19:30 - 23:45
    const isLunchOpen = currentTime >= 13.0 && currentTime < 16.5;
    const isDinnerOpen = currentTime >= 19.5 && currentTime < 23.75;

    if (isLunchOpen || isDinnerOpen) {
      liveStatusText.textContent = `Abierto ahora • Servicio de cocina activo en sala y terraza`;
      if (liveDot) liveDot.classList.remove('closed');
    } else {
      let nextOpening = currentTime < 13.0 ? "13:00 hrs" : "19:30 hrs";
      if (currentTime >= 23.75) nextOpening = "mañana a las 13:00 hrs";
      liveStatusText.textContent = `Cocina en preparación • Próxima apertura a las ${nextOpening}`;
      if (liveDot) liveDot.classList.add('closed');
    }
  }
  updateRestaurantStatus();

  // Predefinir fecha mínima de reserva a hoy
  if (resDateInput) {
    const today = new Date().toISOString().split('T')[0];
    resDateInput.min = today;
    resDateInput.value = today;
  }

  // ==========================================================================
  // 6. RENDERIZADO DEL MENÚ
  // ==========================================================================
  let currentCategory = 'todos';
  let currentSearchQuery = '';

  function getBadgeClass(badgeName) {
    if (badgeName.includes('Chef') || badgeName.includes('Recomendación')) return 'badge-chef';
    if (badgeName.includes('Vegano') || badgeName.includes('Vegetariano')) return 'badge-veg';
    return 'badge-spicy';
  }

  function renderMenu() {
    const filtered = menuItems.filter(item => {
      const matchesCat = currentCategory === 'todos' || item.category === currentCategory;
      const searchNeedle = currentSearchQuery.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(searchNeedle) ||
                            item.desc.toLowerCase().includes(searchNeedle);
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      menuGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
          <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No se encontraron platos con esa búsqueda.</p>
          <button class="btn btn-outline" id="resetFilterBtn">Restablecer filtros</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetFilterBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentCategory = 'todos';
          currentSearchQuery = '';
          menuSearch.value = '';
          document.querySelectorAll('.cat-pill').forEach(b => b.classList.toggle('active', b.dataset.cat === 'todos'));
          renderMenu();
        });
      }
      return;
    }

    menuGrid.innerHTML = filtered.map(item => {
      const badgesHTML = item.badges.map(b => `<span class="dish-badge ${getBadgeClass(b)}">${b}</span>`).join('');
      
      return `
        <article class="dish-card" data-id="${item.id}">
          <div>
            <div class="dish-header">
              <div class="dish-title-wrap">
                <h3 class="dish-title">${item.name}</h3>
                <div class="dish-badges">${badgesHTML}</div>
              </div>
              <span class="dish-price">${formatMoney(item.price)}</span>
            </div>
            <p class="dish-desc">${item.desc}</p>
          </div>
          
          <div class="dish-footer">
            <span class="dish-pair">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              ${item.pairing}
            </span>
            <button class="add-dish-btn" data-add="${item.id}" aria-label="Agregar ${item.name} al pedido">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Agregar</span>
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Listener para los botones de agregar
    document.querySelectorAll('[data-add]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.add, 10);
        addToCart(id);
      });
    });
  }

  // Filtrado por categoría
  if (menuCategories) {
    menuCategories.addEventListener('click', (e) => {
      const pill = e.target.closest('.cat-pill');
      if (!pill) return;

      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      currentCategory = pill.dataset.cat;
      renderMenu();
    });
  }

  // Búsqueda en tiempo real
  if (menuSearch) {
    menuSearch.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim();
      renderMenu();
    });
  }

  // Render inicial
  renderMenu();

  // ==========================================================================
  // 7. SISTEMA DE CARRITO / PEDIDO
  // ==========================================================================
  function addToCart(itemId) {
    const existing = cart.find(i => i.id === itemId);
    const itemData = menuItems.find(i => i.id === itemId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: itemId, quantity: 1 });
    }

    updateCartUI();
    showToast(`"${itemData.name}" añadido a tu selección`);
  }

  function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    updateCartUI();
  }

  function changeQuantity(itemId, delta) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartUI();
    }
  }

  function updateCartUI() {
    // Contador total de unidades
    const totalCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    cartCount.textContent = totalCount;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart-state">
          <svg class="empty-cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <p>Tu selección está vacía</p>
          <span style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-top: 0.3rem;">
            Explora la carta y añade tus platos favoritos.
          </span>
        </div>
      `;
      cartSubtotal.textContent = formatMoney(0);
      cartTip.textContent = formatMoney(0);
      cartTotal.textContent = formatMoney(0);
      return;
    }

    let subtotal = 0;

    cartItemsContainer.innerHTML = cart.map(cartItem => {
      const data = menuItems.find(m => m.id === cartItem.id);
      const itemSubtotal = data.price * cartItem.quantity;
      subtotal += itemSubtotal;

      return `
        <div class="cart-item">
          <div class="cart-item-info">
            <h4 class="cart-item-name">${data.name}</h4>
            <span class="cart-item-price">${formatMoney(itemSubtotal)}</span>
          </div>

          <div class="cart-item-qty">
            <button class="qty-btn" data-minus="${cartItem.id}" aria-label="Disminuir cantidad">-</button>
            <span class="qty-val">${cartItem.quantity}</span>
            <button class="qty-btn" data-plus="${cartItem.id}" aria-label="Aumentar cantidad">+</button>
          </div>
        </div>
      `;
    }).join('');

    const tip = Math.round(subtotal * 0.10);
    const grandTotal = subtotal + tip;

    cartSubtotal.textContent = formatMoney(subtotal);
    cartTip.textContent = formatMoney(tip);
    cartTotal.textContent = formatMoney(grandTotal);

    // Asignar eventos de cantidad
    document.querySelectorAll('[data-minus]').forEach(btn => {
      btn.addEventListener('click', () => changeQuantity(parseInt(btn.dataset.minus, 10), -1));
    });
    document.querySelectorAll('[data-plus]').forEach(btn => {
      btn.addEventListener('click', () => changeQuantity(parseInt(btn.dataset.plus, 10), 1));
    });
  }

  // Abrir / Cerrar Drawer
  function toggleDrawer(open) {
    if (open) {
      cartDrawer.classList.add('active');
      cartBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      cartDrawer.classList.remove('active');
      cartBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openCartBtn.addEventListener('click', () => toggleDrawer(true));
  closeCartBtn.addEventListener('click', () => toggleDrawer(false));
  cartBackdrop.addEventListener('click', () => toggleDrawer(false));

  clearCartBtn.addEventListener('click', () => {
    if (cart.length > 0 && confirm('¿Deseas vaciar tu selección de platos?')) {
      cart = [];
      updateCartUI();
      showToast('Selección de platos vaciada');
    }
  });

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Tu pedido está vacío. Elige al menos un plato de nuestra carta.');
      return;
    }
    toggleDrawer(false);
    showToast('¡Pedido recibido! El equipo de servicio iniciará la comanda.', '✦');
    cart = [];
    updateCartUI();
  });

  // ==========================================================================
  // 8. FORMULARIO DE RESERVACIONES
  // ==========================================================================
  let guestsCount = 2;

  function updateGuests(newVal) {
    if (newVal < 1) newVal = 1;
    if (newVal > 12) {
      alert('Para grupos mayores a 12 personas, por favor comunícate directamente con nuestro equipo de eventos al +57 (601) 892-4410.');
      return;
    }
    guestsCount = newVal;
    resGuestsInput.value = guestsCount;
    guestsCountDisplay.textContent = `${guestsCount} ${guestsCount === 1 ? 'Persona' : 'Personas'}`;
  }

  decreaseGuestsBtn.addEventListener('click', () => updateGuests(guestsCount - 1));
  increaseGuestsBtn.addEventListener('click', () => updateGuests(guestsCount + 1));

  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('resName').value.trim();
    const phone = document.getElementById('resPhone').value.trim();
    const date = document.getElementById('resDate').value;
    const time = document.getElementById('resTime').value;
    const area = document.getElementById('resArea').value;
    const notes = document.getElementById('resNotes').value.trim();

    if (!name || !phone || !date || !time) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    // Generar código aleatorio de reserva
    const randomCode = 'AUR-' + Math.floor(1000 + Math.random() * 9000);

    // Formatear fecha amigable
    const dateObj = new Date(date + 'T12:00:00');
    const dateStr = dateObj.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Llenar ticket
    reservationTicket.innerHTML = `
      <div class="ticket-header">
        <div>
          <span>Código de Reserva</span>
          <div class="ticket-code">${randomCode}</div>
        </div>
        <div style="text-align: right;">
          <span>Estado</span>
          <strong style="color: #4ade80;">CONFIRMADA</strong>
        </div>
      </div>

      <div class="ticket-grid">
        <div class="ticket-field">
          <span>Titular</span>
          <strong>${name}</strong>
        </div>
        <div class="ticket-field">
          <span>Comensales</span>
          <strong>${guestsCount} personas</strong>
        </div>
        <div class="ticket-field">
          <span>Fecha & Hora</span>
          <strong>${dateStr} a las ${time}</strong>
        </div>
        <div class="ticket-field">
          <span>Espacio</span>
          <strong>${area}</strong>
        </div>
      </div>

      ${notes ? `
        <div style="margin-top: 0.8rem; padding-top: 0.8rem; border-top: 1px dashed var(--border-subtle); font-size: 0.82rem; color: var(--text-secondary);">
          <strong>Notas especiales:</strong> ${notes}
        </div>
      ` : ''}
    `;

    // Abrir modal
    reservationModalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Limpiar formulario
    reservationForm.reset();
    updateGuests(2);
  });

  closeResModalBtn.addEventListener('click', () => {
    reservationModalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    showToast('Reserva guardada. Te esperamos.');
  });

  reservationModalBackdrop.addEventListener('click', (e) => {
    if (e.target === reservationModalBackdrop) {
      reservationModalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ==========================================================================
  // 9. NAVEGACIÓN MÓVIL Y SCROLL SUAVE
  // ==========================================================================
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Efecto de sombra al hacer scroll en Navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active Link Spy
  const sections = document.querySelectorAll('section[id], header[id]');
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    }
  });

  // ==========================================================================
  // 10. SISTEMA DE TOASTS
  // ==========================================================================
  function showToast(message, icon = '✓') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toast-out 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3200);
  }

  // Inicializar UI de carrito
  updateCartUI();

});
