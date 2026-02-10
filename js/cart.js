// Shopping Cart System
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartUI();
    }

    // โหลดตะกร้าจาก Local Storage
    loadCart() {
        const cartData = localStorage.getItem('shoppingCart');
        return cartData ? JSON.parse(cartData) : [];
    }

    // บันทึกตะกร้าไปยัง Local Storage
    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
        this.updateCartUI();
    }

    // เพิ่มสินค้าลงตะกร้า
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: product.quantity || 1
            });
        }

        this.saveCart();
        this.showNotification(`เพิ่ม "${product.name}" ลงตะกร้าแล้ว!`);
    }

    // ลบสินค้าออกจากตะกร้า
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    // อัพเดทจำนวนสินค้า
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity > 0) {
                item.quantity = quantity;
            } else {
                this.removeItem(productId);
            }
            this.saveCart();
        }
    }

    // ล้างตะกร้า
    clearCart() {
        this.items = [];
        this.saveCart();
    }

    // คำนวณจำนวนสินค้าทั้งหมด
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // คำนวณราคารวม
    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // อัพเดท UI ของตะกร้า
    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = this.getTotalItems();
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }
    }

    // แสดงการแจ้งเตือน
    showNotification(message) {
        // ใช้ Bootstrap Toast หรือ Alert แบบง่าย
        const notification = document.createElement('div');
        notification.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-5';
        notification.style.zIndex = '9999';
        notification.innerHTML = `
            <i class="bi bi-check-circle me-2"></i>
            ${message}
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// สร้าง instance ของ Shopping Cart
const cart = new ShoppingCart();

// ฟังก์ชันสำหรับเพิ่มสินค้าจากปุ่ม
function addToCartFromButton(button) {
    const productCard = button.closest('.product-item') || button.closest('.card');

    // ดึงข้อมูลจาก data attributes หรือจาก DOM
    const productId = button.dataset.productId ||
        productCard.querySelector('a[href*="product-detail"]')?.href.match(/id=(\d+)/)?.[1] ||
        Math.random().toString();

    const productName = productCard.querySelector('.card-title')?.textContent || 'สินค้า';
    const priceText = productCard.querySelector('.price')?.textContent || '฿0';
    const productPrice = parseInt(priceText.replace(/[฿,]/g, ''));
    const productImage = productCard.querySelector('img')?.src || '';

    cart.addItem({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
    });
}

// ฟังก์ชันสำหรับหน้า Product Detail
function addToCartFromDetail() {
    const quantity = parseInt(document.getElementById('quantity')?.value || 1);

    // ดึงข้อมูลจาก URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || '1';

    const productName = document.querySelector('.product-info h1')?.textContent || 'สินค้า';
    const priceText = document.querySelector('.product-info .price')?.textContent || '฿0';
    const productPrice = parseInt(priceText.replace(/[฿,]/g, ''));
    const productImage = document.getElementById('mainProductImage')?.src || '';

    cart.addItem({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: quantity
    });
}

// Export ฟังก์ชันไปใช้งานใน HTML
window.cart = cart;
window.addToCartFromButton = addToCartFromButton;
window.addToCartFromDetail = addToCartFromDetail;
