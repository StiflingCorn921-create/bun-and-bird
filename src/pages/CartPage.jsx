import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteContent } from '../data/siteContent';
import { branches } from '../data';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService, SERVICED_DELIVERY_AREAS } from '../services/orderService';
import { DELIVERY_FEE } from '../models/Cart';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { QuantitySelector } from '../components/QuantitySelector';
import { EmptyState } from '../components/EmptyState';
import { FoodImage } from '../components/FoodImage';

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

  const { user, isAuthenticated, openAuthModal, logout } = useAuth();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAreaId, setDeliveryAreaId] = useState(SERVICED_DELIVERY_AREAS[0]?.id || '');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedBranchId, setSelectedBranchId] = useState(branches[0]?.id || '');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState({ type: null, text: '' });
  const [errors, setErrors] = useState({});
  const [placedOrder, setPlacedOrder] = useState(null);

  const currency = siteContent.common.currencySymbol;

  useEffect(() => {
    if (user) {
      if (user.name && !customerName) setCustomerName(user.name);
      if (user.phone && !customerPhone) setCustomerPhone(user.phone);
      if (user.address && !deliveryAddress) setDeliveryAddress(user.address);
    }
  }, [user]);

  const selectedArea = SERVICED_DELIVERY_AREAS.find((a) => a.id === deliveryAreaId);
  const availableBranches =
    cart.orderType === 'delivery' && selectedArea
      ? branches.filter((b) => b.region === selectedArea.region)
      : branches;

  const handleAreaChange = (areaId) => {
    setDeliveryAreaId(areaId);
    const area = SERVICED_DELIVERY_AREAS.find((a) => a.id === areaId);
    if (area && area.branchId) {
      setSelectedBranchId(area.branchId);
    }
  };

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

  const validateForm = () => {
    const newErrors = {};

    if (!isAuthenticated) {
      newErrors.auth = siteContent.checkout.validationErrors.authRequired;
      openAuthModal('login');
      return false;
    }

    if (!customerName.trim()) {
      newErrors.name = siteContent.checkout.validationErrors.nameRequired;
    }

    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (!customerPhone.trim()) {
      newErrors.phone = siteContent.checkout.validationErrors.phoneRequired;
    } else if (cleanPhone.length < 10) {
      newErrors.phone = siteContent.checkout.validationErrors.phoneInvalid;
    }

    if (cart.orderType === 'delivery') {
      if (!deliveryAreaId || deliveryAreaId === 'outside') {
        newErrors.area = siteContent.checkout.validationErrors.areaRequired;
      }
      if (!deliveryAddress.trim()) {
        newErrors.address = siteContent.checkout.validationErrors.addressRequired;
      }
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

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const branch =
      availableBranches.find((b) => b.id === selectedBranchId) ||
      availableBranches[0] ||
      branches[0];
    const chosenArea = SERVICED_DELIVERY_AREAS.find((a) => a.id === deliveryAreaId);

    const newOrder = orderService.createOrder({
      items: cart.items,
      customer: {
        name: customerName.trim(),
        phone: customerPhone.trim(),
        address: cart.orderType === 'delivery' ? deliveryAddress.trim() : '',
      },
      orderType: cart.orderType,
      branch: branch,
      total: cart.getTotal(),
      paymentMethod: paymentMethod,
      deliveryArea: chosenArea ? chosenArea.name : null,
    });

    setPlacedOrder(newOrder);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdvanceStatus = () => {
    if (!placedOrder) return;
    const nextStatus = orderService.advanceStatus(placedOrder.status);
    placedOrder.status = nextStatus;
    setPlacedOrder(
      Object.assign(
        Object.create(Object.getPrototypeOf(placedOrder)),
        placedOrder,
        { status: nextStatus }
      )
    );
  };

  if (placedOrder) {
    const isCompleted = placedOrder.status === 'Completed';

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 animate-in fade-in duration-300">
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
                      ? 'border-ketchup bg-amber-50 shadow-xs'
                      : isPassed
                      ? 'border-green-600 bg-green-50 text-green-800'
                      : 'border-charcoal/10 bg-cream text-charcoal-muted opacity-60'
                  }`}
                >
                  <span className="text-xs uppercase font-bold tracking-wider block">
                    Step 0{idx + 1}
                  </span>
                  <span className="text-sm sm:text-base font-black block mt-0.5">
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-cream-light border-2 border-charcoal/10 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-black text-charcoal border-b border-charcoal/10 pb-3">
              {siteContent.confirmation.fulfillmentDetailsTitle}
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal-muted">
                  {siteContent.confirmation.orderTypeLabel}
                </span>
                <span className="font-bold text-charcoal capitalize">
                  {placedOrder.orderType}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-charcoal-muted">
                  {siteContent.confirmation.branchLabel}
                </span>
                <span className="font-bold text-charcoal text-right">
                  {placedOrder.branch?.name}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-charcoal-muted">
                  {siteContent.confirmation.customerNameLabel}
                </span>
                <span className="font-bold text-charcoal">
                  {placedOrder.customer?.name}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-charcoal-muted">
                  {siteContent.confirmation.customerPhoneLabel}
                </span>
                <span className="font-bold text-charcoal">
                  {placedOrder.customer?.phone}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-charcoal-muted">
                  {siteContent.confirmation.paymentMethodLabel}
                </span>
                <span className="font-bold text-charcoal">
                  {placedOrder.paymentMethod}
                </span>
              </div>

              {placedOrder.orderType === 'delivery' && (
                <div className="flex flex-col pt-2 border-t border-charcoal/10">
                  <span className="text-charcoal-muted text-xs">
                    {siteContent.confirmation.deliveryAddressLabel}
                  </span>
                  <span className="font-bold text-charcoal text-sm mt-0.5">
                    {placedOrder.customer?.address}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-cream-light border-2 border-charcoal/10 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-black text-charcoal border-b border-charcoal/10 pb-3">
                {siteContent.confirmation.orderSummaryTitle}
              </h3>

              <div className="space-y-3 mt-3 max-h-60 overflow-y-auto pr-1">
                {placedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between text-sm gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-charcoal/10">
                        <FoodImage
                          src={item.menuItem?.image}
                          alt={item.menuItem?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
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

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <EmptyState
          emoji={siteContent.cart.emptyEmoji}
          title={siteContent.cart.emptyTitle}
          subtitle={siteContent.cart.emptySubtitle}
          actionLabel={siteContent.cart.browseMenuBtn}
          actionTo="/menu"
        />
      </div>
    );
  }

  const isOutsideArea =
    cart.orderType === 'delivery' && (!deliveryAreaId || deliveryAreaId === 'outside');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div>
        <h1 className="text-3xl sm:text-5xl font-black text-charcoal tracking-tight">
          {siteContent.cart.pageTitle}
        </h1>
        <p className="text-sm sm:text-base text-charcoal-muted mt-2 font-medium">
          {cart.items.length}{' '}
          {cart.items.length === 1
            ? siteContent.common.itemsBadgeSingle
            : siteContent.common.itemsBadgePlural}{' '}
          in your cart
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-8">
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
                  <div
                    key={item.id}
                    className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl bg-amber-100 overflow-hidden shrink-0 border border-charcoal/10">
                        <FoodImage
                          src={item.menuItem?.image}
                          alt={item.menuItem?.name}
                          className="w-full h-full object-cover"
                        />
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
                          {(
                            (item.menuItem?.price || 0) +
                            (item.selectedAddOns || []).reduce(
                              (s, a) => s + (a.price || 0),
                              0
                            )
                          ).toFixed(2)}
                        </span>

                        {item.selectedAddOns?.length > 0 && (
                          <div className="text-xs text-charcoal/80 flex flex-wrap gap-1 pt-1">
                            <span className="font-bold">
                              {siteContent.cart.itemAddOnsPrefix}
                            </span>
                            {item.selectedAddOns.map((a) => (
                              <span
                                key={a.id}
                                className="bg-amber-100/70 px-1.5 py-0.5 rounded text-charcoal"
                              >
                                {a.name} ({siteContent.common.plus}
                                {currency}
                                {a.price})
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

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
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
                      {siteContent.common.plus}
                      {currency}
                      {DELIVERY_FEE}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-muted">
                    {siteContent.cart.deliveryDescription}
                  </p>
                </button>
              </div>
            </div>

            {cart.orderType === 'delivery' && (
              <div className="bg-cream-light border-2 border-charcoal/10 rounded-3xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-charcoal">
                    {siteContent.cart.deliveryAreaTitle}
                  </h2>
                  <span className="text-xs font-bold text-mustard bg-amber-100 px-2.5 py-1 rounded-full border border-mustard/40">
                    Metro Manila & Cebu
                  </span>
                </div>

                <label className="text-xs font-bold text-charcoal-muted block">
                  {siteContent.cart.deliveryAreaLabel}
                </label>
                <select
                  value={deliveryAreaId}
                  onChange={(e) => handleAreaChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-cream border-2 border-charcoal/15 font-semibold text-charcoal focus:border-ketchup focus:outline-none focus:ring-2 focus:ring-ketchup/20 text-sm cursor-pointer"
                >
                  <option value="">{siteContent.cart.deliveryAreaPlaceholder}</option>
                  <optgroup label="Metro Manila Branches (BGC & Tomas Morato)">
                    {SERVICED_DELIVERY_AREAS.filter((a) => a.region === 'Metro Manila').map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Metro Cebu Branches (Ayala & SM Seaside)">
                    {SERVICED_DELIVERY_AREAS.filter((a) => a.region === 'Metro Cebu').map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </optgroup>
                  <option value="outside">Other Location (Outside Coverage Zone)</option>
                </select>

                {deliveryAreaId === 'outside' && (
                  <div className="p-3 bg-red-50 border-2 border-red-200 rounded-xl text-xs text-red-700 font-semibold leading-relaxed">
                    {siteContent.cart.unsupportedAreaWarning}
                  </div>
                )}
                {errors.area && (
                  <p className="text-xs font-bold text-red-600">{errors.area}</p>
                )}
              </div>
            )}

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
                {availableBranches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} {siteContent.common.dash} {b.address}
                  </option>
                ))}
              </select>
              {errors.branch && (
                <p className="text-xs font-bold text-red-600">{errors.branch}</p>
              )}
            </div>

            <div className="bg-cream-light border-2 border-charcoal/10 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-charcoal/10 pb-3">
                <h2 className="text-xl font-black text-charcoal">
                  {siteContent.cart.customerTitle}
                </h2>
                {isAuthenticated && (
                  <button
                    type="button"
                    onClick={logout}
                    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    {siteContent.auth.switchAccount}
                  </button>
                )}
              </div>

              {!isAuthenticated ? (
                <div className="p-5 bg-amber-50/70 border-2 border-mustard/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-ketchup" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm font-black text-charcoal">
                        {siteContent.auth.accountRequiredNotice}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-muted">
                      Quick sign in or create an account with just your name and password.
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={() => openAuthModal('login')}
                    >
                      {siteContent.auth.tabLogin}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => openAuthModal('signup')}
                    >
                      {siteContent.auth.tabSignup}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-green-700 text-cream font-black flex items-center justify-center text-xs">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-green-900 block">
                        {siteContent.auth.signedInAs} <strong>{user?.name || 'Account'}</strong>
                      </span>
                      <span className="text-[11px] text-green-800">
                        {user?.email || user?.phone || ''}
                      </span>
                    </div>
                  </div>
                  <Badge variant="neutral">Verified Account</Badge>
                </div>
              )}

              {errors.auth && (
                <p className="text-xs font-bold text-red-600">{errors.auth}</p>
              )}

              <div className="space-y-4 pt-2">
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

            <div className="bg-cream-light border-2 border-charcoal/10 rounded-3xl p-6 space-y-4">
              <h2 className="text-xl font-black text-charcoal">
                {siteContent.cart.paymentTitle}
              </h2>

              <div className="space-y-2.5">
                {[
                  { id: 'cod', label: siteContent.cart.paymentCod, desc: 'Pay in cash upon arrival' },
                  { id: 'gcash', label: siteContent.cart.paymentGcash, desc: 'Scan driver QR or pay in store' },
                  { id: 'card', label: siteContent.cart.paymentCard, desc: 'Wireless terminal on delivery' },
                ].map((pm) => (
                  <label
                    key={pm.id}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === pm.label
                        ? 'border-ketchup bg-amber-50 shadow-xs'
                        : 'border-charcoal/10 bg-cream hover:border-charcoal/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={pm.label}
                      checked={paymentMethod === pm.label}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 accent-ketchup"
                    />
                    <div>
                      <span className="text-sm font-black text-charcoal block">
                        {pm.label}
                      </span>
                      <span className="text-xs text-charcoal-muted">
                        {pm.desc}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
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
                  <p className="text-[11px] text-charcoal-muted">
                    {siteContent.cart.promoAvailableHint}
                  </p>
                  {promoMessage.text && (
                    <p
                      className={`text-xs font-bold ${
                        promoMessage.type === 'error' ? 'text-red-600' : 'text-green-700'
                      }`}
                    >
                      {promoMessage.text}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
                  <div>
                    <span className="font-mono font-black text-green-900 text-sm block">
                      {cart.promo.code}
                    </span>
                    <span className="text-xs text-green-800">
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

            <div className="bg-cream-light border-2 border-charcoal/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
              <h3 className="text-xl font-black text-charcoal border-b border-charcoal/10 pb-3">
                {siteContent.cart.summaryTitle}
              </h3>

              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex items-center justify-between">
                  <span className="text-charcoal-muted font-medium">
                    {siteContent.cart.subtotalLabel}
                  </span>
                  <span className="font-bold text-charcoal">
                    {currency}
                    {cart.getSubtotal().toFixed(2)}
                  </span>
                </div>

                {cart.getDiscount() > 0 && (
                  <div className="flex items-center justify-between text-green-700">
                    <span className="font-medium">{siteContent.cart.discountLabel}</span>
                    <span className="font-bold">
                      {siteContent.common.minus}
                      {currency}
                      {cart.getDiscount().toFixed(2)}
                    </span>
                  </div>
                )}

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

              {isOutsideArea && (
                <p className="text-xs font-bold text-amber-700 text-center bg-amber-50 p-2 rounded-lg border border-amber-200">
                  ⚠️ Delivery is not supported outside serviced zones.
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isOutsideArea}
                className="w-full text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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
