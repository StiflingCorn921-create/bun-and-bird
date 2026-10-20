import { useState } from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../data/siteContent';
import { branches } from '../data';
import { useCart } from '../context/CartContext';
import { Order } from '../models/Order';
import { DELIVERY_FEE } from '../models/Cart';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { QuantitySelector } from '../components/QuantitySelector';
import { EmptyState } from '../components/EmptyState';

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeItem,
    applyPromo,
    removePromo,
    setOrderType,
    clearCart,
  } = useCart();

  // Form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState(branches[0]?.id || '');

  // Promo state
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState({ type: null, text: '' });

  // Form validation errors
  const [errors, setErrors] = useState({});

  // Placed order state for confirmation screen
  const [placedOrder, setPlacedOrder] = useState(null);

  const currency = siteContent.common.currencySymbol;

  // Handle promo code application
  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const success = applyPromo(promoInput);
    if (success) {
      setPromoMessage({
        type: 'success',
        text: siteContent.cart.promoSuccessMsg,
      });
      setPromoInput('');
    } else {
      setPromoMessage({
        type: 'error',
        text: siteContent.cart.promoInvalidMsg,
      });
    }
  };

  const handleRemovePromo = () => {
    removePromo();
    setPromoMessage({ type: null, text: '' });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!customerName.trim()) {
      newErrors.name = siteContent.checkout.validationErrors.nameRequired;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!customerPhone.trim()) {
      newErrors.phone = siteContent.checkout.validationErrors.phoneRequired;
    } else if (cleanPhone.length < 10) {
      newErrors.phone = siteContent.checkout.validationErrors.phoneInvalid;
    }

    if (cart.orderType === 'delivery' && !deliveryAddress.trim()) {
      newErrors.address = siteContent.checkout.validationErrors.addressRequired;
    }

    if (!selectedBranchId) {
      newErrors.branch = siteContent.checkout.validationErrors.branchRequired;
    }

    if (!cart.items || cart.items.length === 0) {
      newErrors.cart = siteContent.checkout.validationErrors.cartEmpty;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle checkout submission
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const branch = branches.find((b) => b.id === selectedBranchId) || branches[0];

    const newOrder = new Order({
      id: `BNB-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart.items],
      customer: {
        name: customerName.trim(),
        phone: customerPhone.trim(),
        address: cart.orderType === 'delivery' ? deliveryAddress.trim() : '',
      },
      orderType: cart.orderType,
      branch: branch,
      total: cart.getTotal(),
      status: 'Preparing',
    });

    setPlacedOrder(newOrder);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Advance live order status
  const handleAdvanceStatus = () => {
    if (!placedOrder) return;
    placedOrder.advanceStatus();
    // Create new order instance to trigger re-render
    setPlacedOrder(
      new Order({
        id: placedOrder.id,
        items: placedOrder.items,
        customer: placedOrder.customer,
        orderType: placedOrder.orderType,
        branch: placedOrder.branch,
        total: placedOrder.total,
        status: placedOrder.status,
      })
    );
  };

  // ==================== CONFIRMATION PANEL ====================
  if (placedOrder) {
    const isCompleted = placedOrder.status === 'Completed';

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 animate-in fade-in duration-300">
        {/* Success Header */}
        <div className="text-center space-y-3 bg-amber-100/60 border-2 border-mustard rounded-3xl p-6 sm:p-10 shadow-sm">
          <span className="text-6xl sm:text-7xl block select-none">
            {siteContent.confirmation.partyEmoji}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-charcoal">
            {siteContent.confirmation.title}
          </h1>
          <p className="text-base sm:text-lg text-charcoal-muted max-w-lg mx-auto">
            {siteContent.confirmation.subtitle}
          </p>
          <div className="inline-block bg-charcoal text-cream font-mono font-bold px-4 py-2 rounded-xl text-sm sm:text-base mt-2">
            <span>{siteContent.confirmation.orderIdLabel} </span>
            <span className="text-mustard">{placedOrder.id}</span>
          </div>
        </div>

        {/* Live Status Tracker */}
        <div className="bg-cream-light border-2 border-charcoal/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal/10 pb-4">
            <div>
              <h2 className="text-xl font-black text-charcoal">
                {siteContent.confirmation.statusTitle}
              </h2>
              <p className="text-sm font-bold text-ketchup mt-1">
                {siteContent.confirmation.statuses[placedOrder.status]}
              </p>
            </div>

            {!isCompleted ? (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleAdvanceStatus}
              >
                {siteContent.confirmation.advanceStatusBtn}
              </Button>
            ) : (
              <Badge variant="mustard">
                {siteContent.confirmation.statusCompletedNote}
              </Badge>
            )}
          </div>

          {/* Status Progress Steps */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            {['Preparing', 'Ready', 'Completed'].map((step, idx) => {
              const orderIndex = ['Preparing', 'Ready', 'Completed'].indexOf(placedOrder.status);
              const isCurrent = orderIndex === idx;
              const isPassed = orderIndex >= idx;

              return (
                <div
                  key={step}
                  className={`p-3 rounded-2xl border-2 transition-all ${
                    isCurrent
                      ? 'border-ketchup bg-amber-100/80 shadow-xs'
                      : isPassed
                      ? 'border-mustard/60 bg-cream'
                      : 'border-charcoal/10 bg-cream/40 opacity-50'
                  }`}
                >
                  <div
                    className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-black mb-1.5 ${
                      isPassed ? 'bg-ketchup text-cream' : 'bg-charcoal/20 text-charcoal'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="text-xs sm:text-sm font-black text-charcoal block line-clamp-1">
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fulfillment & Order Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fulfillment Details */}
          <div className="bg-cream-light border-2 border-charcoal/10 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-black text-charcoal border-b border-charcoal/10 pb-3">
              {siteContent.confirmation.fulfillmentDetailsTitle}
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs font-bold text-charcoal-muted uppercase block">
                  {siteContent.confirmation.orderTypeLabel}
                </span>
                <span className="font-bold text-charcoal capitalize">
                  {placedOrder.orderType === 'delivery'
                    ? siteContent.cart.deliveryOption
                    : siteContent.cart.pickupOption}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-charcoal-muted uppercase block">
                  {siteContent.confirmation.branchLabel}
                </span>
                <span className="font-bold text-charcoal">
                  {placedOrder.branch?.name}
                </span>
                <p className="text-xs text-charcoal-muted">
                  {placedOrder.branch?.address}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-charcoal-muted uppercase block">
                  {siteContent.confirmation.customerNameLabel}
                </span>
                <span className="font-bold text-charcoal">
                  {placedOrder.customer?.name}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-charcoal-muted uppercase block">
                  {siteContent.confirmation.customerPhoneLabel}
                </span>
                <span className="font-bold text-charcoal">
                  {placedOrder.customer?.phone}
                </span>
              </div>

              {placedOrder.orderType === 'delivery' && placedOrder.customer?.address && (
                <div>
                  <span className="text-xs font-bold text-charcoal-muted uppercase block">
                    {siteContent.confirmation.deliveryAddressLabel}
                  </span>
                  <span className="font-bold text-charcoal">
                    {placedOrder.customer?.address}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Ordered Items Summary */}
          <div className="bg-cream-light border-2 border-charcoal/10 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-black text-charcoal border-b border-charcoal/10 pb-3">
                {siteContent.confirmation.orderSummaryTitle}
              </h3>

              <div className="space-y-3 mt-3 max-h-60 overflow-y-auto pr-1">
                {placedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between text-sm gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl select-none">{item.menuItem?.image}</span>
                      <div>
                        <span className="font-bold text-charcoal">
                          {item.quantity} {siteContent.common.timesSymbol} {item.menuItem?.name}
                        </span>
                        {item.selectedAddOns?.length > 0 && (
                          <p className="text-xs text-charcoal-muted">
                            {siteContent.cart.itemAddOnsPrefix}
                            {item.selectedAddOns.map((a) => a.name).join(siteContent.common.separator)}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-charcoal">
                      {currency}
                      {item.getSubtotal().toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-charcoal/10 flex items-center justify-between">
              <span className="text-base font-black text-charcoal">
                {siteContent.confirmation.totalPaidLabel}
              </span>
              <span className="text-2xl font-black text-ketchup">
                {currency}
                {placedOrder.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center pt-4">
          <Button
            type="button"
            variant="primary"
            size="lg"
            onClick={() => setPlacedOrder(null)}
          >
            {siteContent.confirmation.newOrderBtn}
          </Button>
        </div>
      </div>
    );
  }

  // ==================== EMPTY CART STATE ====================
  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <EmptyState
          emoji={siteContent.cart.emptyEmoji}
          title={siteContent.cart.emptyTitle}
          subtitle={siteContent.cart.emptySubtitle}
          actionLabel={siteContent.cart.browseMenuBtn}
          onAction={() => window.location.assign('/menu')}
        />
      </div>
    );
  }

  // ==================== CART & CHECKOUT FORM ====================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-charcoal">
          {siteContent.cart.title}
        </h1>
        <p className="text-sm sm:text-base text-charcoal-muted mt-1">
          {siteContent.cart.subtitle}
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items & Checkout Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Selected Items */}
            <div className="bg-cream-light border-2 border-charcoal/10 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-charcoal/10 pb-3">
                <h2 className="text-xl font-black text-charcoal">
                  {siteContent.cart.itemsTitle}
                </h2>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                >
                  {siteContent.cart.clearCartBtn}
                </button>
              </div>

              <div className="space-y-4 divide-y divide-charcoal/10">
                {cart.items.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Item Details */}
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl select-none shrink-0 border border-charcoal/10">
                        {item.menuItem?.image}
                      </div>

                      <div className="space-y-0.5">
                        <Link
                          to={`/menu/${item.menuItem?.id}`}
                          className="font-black text-charcoal hover:text-ketchup transition-colors block leading-tight text-base"
                        >
                          {item.menuItem?.name}
                        </Link>
                        <span className="text-xs text-charcoal-muted block">
                          {siteContent.cart.unitPricePrefix}
                          {currency}
                          {(item.menuItem?.price + (item.selectedAddOns || []).reduce((s, a) => s + (a.price || 0), 0)).toFixed(2)}
                        </span>

                        {item.selectedAddOns?.length > 0 && (
                          <div className="text-xs text-charcoal/80 flex flex-wrap gap-1 pt-1">
                            <span className="font-bold">{siteContent.cart.itemAddOnsPrefix}</span>
                            {item.selectedAddOns.map((a) => (
                              <span key={a.id} className="bg-amber-100/70 px-1.5 py-0.5 rounded text-charcoal">
                                {a.name} ({siteContent.common.plus}{currency}{a.price})
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Subtotal Controls */}
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 shrink-0">
                      <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                        onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                      />

                      <div className="text-right min-w-[70px]">
                        <span className="font-black text-base text-ketchup block">
                          {currency}
                          {item.getSubtotal().toFixed(2)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={siteContent.cart.removeBtnAria}
                        className="p-1.5 rounded-lg text-charcoal-muted hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Order Type Toggle */}
            <div className="bg-cream-light border-2 border-charcoal/10 rounded-3xl p-6 space-y-4">
              <h2 className="text-xl font-black text-charcoal">
                {siteContent.cart.orderTypeTitle}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    cart.orderType === 'pickup'
                      ? 'border-ketchup bg-amber-50 shadow-xs'
                      : 'border-charcoal/10 bg-cream-light hover:border-charcoal/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-charcoal text-base">
                      {siteContent.cart.pickupOption}
                    </span>
                    <Badge variant="mustard">{siteContent.cart.freeDeliveryBadge}</Badge>
                  </div>
                  <p className="text-xs text-charcoal-muted">
                    {siteContent.cart.pickupDescription}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    cart.orderType === 'delivery'
                      ? 'border-ketchup bg-amber-50 shadow-xs'
                      : 'border-charcoal/10 bg-cream-light hover:border-charcoal/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-charcoal text-base">
                      {siteContent.cart.deliveryOption}
                    </span>
                    <span className="text-xs font-bold text-ketchup">
                      {siteContent.common.plus}{currency}{DELIVERY_FEE}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-muted">
                    {siteContent.cart.deliveryDescription}
                  </p>
                </button>
              </div>
            </div>

            {/* 3. Branch Selector */}
            <div className="bg-cream-light border-2 border-charcoal/10 rounded-3xl p-6 space-y-3">
              <h2 className="text-xl font-black text-charcoal">
                {siteContent.cart.branchTitle}
              </h2>

              <select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-cream border-2 border-charcoal/15 font-semibold text-charcoal focus:border-ketchup focus:outline-none focus:ring-2 focus:ring-ketchup/20 text-sm cursor-pointer"
              >
                <option value="">{siteContent.cart.branchSelectPlaceholder}</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} {siteContent.common.dash} {b.address}
                  </option>
                ))}
              </select>
              {errors.branch && (
                <p className="text-xs font-bold text-red-600">{errors.branch}</p>
              )}
            </div>

            {/* 4. Customer Contact Details */}
            <div className="bg-cream-light border-2 border-charcoal/10 rounded-3xl p-6 space-y-4">
              <h2 className="text-xl font-black text-charcoal">
                {siteContent.cart.customerTitle}
              </h2>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="text-xs font-bold text-charcoal-muted block mb-1">
                    {siteContent.cart.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={siteContent.cart.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-cream border-2 border-charcoal/15 text-charcoal text-sm font-medium focus:border-ketchup focus:outline-none focus:ring-2 focus:ring-ketchup/20"
                  />
                  {errors.name && (
                    <p className="text-xs font-bold text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="text-xs font-bold text-charcoal-muted block mb-1">
                    {siteContent.cart.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder={siteContent.cart.phonePlaceholder}
                    className="w-full px-4 py-3 rounded-xl bg-cream border-2 border-charcoal/15 text-charcoal text-sm font-medium focus:border-ketchup focus:outline-none focus:ring-2 focus:ring-ketchup/20"
                  />
                  {errors.phone && (
                    <p className="text-xs font-bold text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Delivery Address (only when delivery) */}
                {cart.orderType === 'delivery' && (
                  <div>
                    <label className="text-xs font-bold text-charcoal-muted block mb-1">
                      {siteContent.cart.addressLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder={siteContent.cart.addressPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-cream border-2 border-charcoal/15 text-charcoal text-sm font-medium focus:border-ketchup focus:outline-none focus:ring-2 focus:ring-ketchup/20"
                    />
                    {errors.address && (
                      <p className="text-xs font-bold text-red-600 mt-1">{errors.address}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Promo Code & Order Summary */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            {/* Promo Code Box */}
            <div className="bg-cream-light border-2 border-charcoal/10 rounded-3xl p-6 space-y-3">
              <h3 className="text-base font-black text-charcoal">
                {siteContent.cart.promoTitle}
              </h3>

              {!cart.promo ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder={siteContent.cart.promoPlaceholder}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-cream border-2 border-charcoal/15 uppercase text-sm font-bold text-charcoal focus:border-ketchup focus:outline-none"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={handleApplyPromo}
                    >
                      {siteContent.cart.promoApplyBtn}
                    </Button>
                  </div>

                  <p className="text-xs text-charcoal-muted">
                    {siteContent.cart.promoAvailableHint}
                  </p>

                  {promoMessage.text && (
                    <p
                      className={`text-xs font-bold ${
                        promoMessage.type === 'success' ? 'text-green-700' : 'text-red-600'
                      }`}
                    >
                      {promoMessage.text}
                    </p>
                  )}
                </div>
              ) : (
                <div className="p-3 bg-amber-100 rounded-xl flex items-center justify-between border border-mustard">
                  <div>
                    <span className="font-black text-ketchup text-sm block">
                      {cart.promo.code}
                    </span>
                    <span className="text-xs text-charcoal font-semibold">
                      {cart.promo.type === 'freeDelivery'
                        ? siteContent.cart.promoFreeDeliveryMsg
                        : siteContent.cart.promoSuccessMsg}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    {siteContent.cart.promoRemoveBtn}
                  </button>
                </div>
              )}
            </div>

            {/* Order Totals Summary Card */}
            <div className="bg-cream-light border-2 border-charcoal/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
              <h3 className="text-xl font-black text-charcoal border-b border-charcoal/10 pb-3">
                {siteContent.cart.summaryTitle}
              </h3>

              <div className="space-y-3 text-sm sm:text-base">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-charcoal-muted font-medium">
                    {siteContent.cart.subtotalLabel}
                  </span>
                  <span className="font-bold text-charcoal">
                    {currency}
                    {cart.getSubtotal().toFixed(2)}
                  </span>
                </div>

                {/* Discount */}
                {cart.getDiscount() > 0 && (
                  <div className="flex items-center justify-between text-green-700">
                    <span className="font-medium">{siteContent.cart.discountLabel}</span>
                    <span className="font-bold">
                      {siteContent.common.minus}{currency}
                      {cart.getDiscount().toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Delivery Fee */}
                <div className="flex items-center justify-between">
                  <span className="text-charcoal-muted font-medium">
                    {siteContent.cart.deliveryFeeLabel}
                  </span>
                  <span className="font-bold text-charcoal">
                    {cart.getFee() === 0 ? (
                      <Badge variant="mustard">{siteContent.cart.freeDeliveryBadge}</Badge>
                    ) : (
                      `${currency}${cart.getFee().toFixed(2)}`
                    )}
                  </span>
                </div>

                {/* Total */}
                <div className="pt-4 border-t-2 border-charcoal/15 flex items-center justify-between">
                  <span className="text-lg font-black text-charcoal">
                    {siteContent.cart.totalLabel}
                  </span>
                  <span className="text-3xl font-black text-ketchup">
                    {currency}
                    {cart.getTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              {errors.cart && (
                <p className="text-xs font-bold text-red-600 text-center">
                  {errors.cart}
                </p>
              )}

              {/* Place Order CTA Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full text-lg shadow-md"
              >
                {siteContent.cart.placeOrderBtn}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
