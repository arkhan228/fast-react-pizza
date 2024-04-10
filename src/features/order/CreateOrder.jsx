import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store';
import { createOrder } from '../../services/apiRestaurant';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import { fetchAddress } from '../user/userSlice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = str =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const {
    username,
    address,
    position,
    status: addressStatus,
    error,
  } = useSelector(store => store.user);
  const isLoadingAddress = addressStatus === 'loading';

  const cart = useSelector(getCart);
  const currentCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? currentCartPrice * 0.2 : 0;
  const totalCartPrice = currentCartPrice + priorityPrice;

  const formErrors = useActionData();
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='py-6'>
      <h2 className='mb-8 text-xl font-semibold'>
        Ready to order? Let&apos;s go!
      </h2>

      <Form method='POST'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
            className='input flex-grow'
            type='text'
            placeholder='Your first name'
            name='customer'
            defaultValue={username}
            required
          />
        </div>

        <div className='mb-5'>
          <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
            <label className='sm:basis-40'>Phone number</label>
            <input
              className='input flex-grow'
              type='tel'
              placeholder='Your phone number'
              name='phone'
              required
            />
          </div>
          {formErrors?.phone && (
            <p className='rounded-md bg-red-200 p-2 text-center text-xs text-red-700'>
              {formErrors.phone}
            </p>
          )}
        </div>

        <div>
          <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
            <label className='sm:basis-40'>Address</label>
            <input
              className='input flex-grow'
              type='text'
              placeholder='Your address'
              name='address'
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />

            {!position.latitude && !position.longitude && (
              <span className='absolute right-[3px] top-[34px] z-50 sm:top-0.5'>
                <Button
                  disabled={isLoadingAddress}
                  type='small'
                  onClick={e => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}>
                  Get position
                </Button>
              </span>
            )}
          </div>

          {addressStatus === 'error' && (
            <p className='rounded-md bg-red-200 p-2 text-center text-xs text-red-700'>
              {error}
            </p>
          )}
        </div>

        <div className='mb-12 mt-4 flex items-center justify-center gap-5'>
          <input
            className='h-6 w-6 accent-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority}
            onChange={e => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority'>Want us to give your order priority?</label>
        </div>

        <div className='flex justify-center'>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <input
            type='hidden'
            name='position'
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting} type='primary'>
            {isSubmitting
              ? 'placing Order...'
              : `Order now for ${formatCurrency(totalCartPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you!';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
