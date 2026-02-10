// สคริปต์สำหรับเพิ่มปุ่มเพิ่มลงตะกร้าให้กับสินค้าทั้งหมดในหน้า products.html
// ใช้คำสั่งนี้ในเบราว์เซอร์ Console เพื่ออัพเดทปุ่มโดยอัตโนมัติ

document.addEventListener('DOMContentLoaded', function () {
    // ดึงรายการสินค้าที่ยังไม่มีปุ่มเพิ่มลงตะกร้า
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach((item, index) => {
        // หาปุ่มดูรายละเอียดในแต่ละสินค้า
        const detailBtn = item.querySelector('.btn-primary');

        if (detailBtn && !item.querySelector('.btn-success')) {
            // ดึง product ID จาก href
            const href = detailBtn.getAttribute('href');
            const productId = href.match(/id=(\d+)/)?.[1] || (index + 1);

            // สร้างปุ่มเพิ่มลงตะกร้า
            const cartBtn = document.createElement('button');
            cartBtn.className = 'btn btn-success btn-sm me-1';
            cartBtn.setAttribute('onclick', 'addToCartFromButton(this)');
            cartBtn.setAttribute('data-product-id', productId);
            cartBtn.innerHTML = '<i class="bi bi-cart-plus"></i>';

            // หา container ของปุ่ม
            const btnContainer = detailBtn.parentElement;

            // ถ้ายังไม่มี div wrapper ให้สร้าง
            if (btnContainer.classList.contains('d-flex')) {
                // หาว่า detailBtn อยู่ใน element ไหน
                const parent = btnContainer;
                const wrapper = document.createElement('div');
                wrapper.appendChild(cartBtn);
                wrapper.appendChild(detailBtn);
                parent.appendChild(wrapper);
                parent.removeChild(detailBtn);
            } else {
                btnContainer.insertBefore(cartBtn, detailBtn);
            }
        }
    });
});
