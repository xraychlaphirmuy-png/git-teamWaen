// สคริปต์เพิ่มปุ่มตะกร้าสินค้าให้กับทุกสินค้าในหน้า products
// เพิ่มลงใน products.html ก่อนปิด </body>

document.addEventListener('DOMContentLoaded', function () {
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach((item) => {
        const detailLink = item.querySelector('a[href*="product-detail"]');
        if (!detailLink) return;

        // ตรวจสอบว่ามีปุ่ม cart แล้วหรือยัง
        if (item.querySelector('.btn-success[onclick*="addToCartFromButton"]')) return;

        // ดึง product ID
        const href = detailLink.getAttribute('href');
        const productId = href.match(/id=(\d+)/)?.[1];
        if (!productId) return;

        // หา parent container ของปุ่ม
        const btnContainer = detailLink.parentElement;

        // ถ้า parent ไม่ใช่ div ให้สร้าง wrapper
        if (btnContainer.classList.contains('d-flex')) {
            const wrapper = document.createElement('div');

            // สร้างปุ่ม cart
            const cartBtn = document.createElement('button');
            cartBtn.className = 'btn btn-success btn-sm me-1';
            cartBtn.setAttribute('onclick', 'addToCartFromButton(this)');
            cartBtn.setAttribute('data-product-id', productId);
            cartBtn.innerHTML = '<i class="bi bi-cart-plus"></i>';

            // ใส่ปุ่มลง wrapper
            wrapper.appendChild(cartBtn);
            wrapper.appendChild(detailLink.cloneNode(true));

            // แทนที่ปุ่มเดิม
            btnContainer.appendChild(wrapper);
            btnContainer.removeChild(detailLink);
        }
    });
});
