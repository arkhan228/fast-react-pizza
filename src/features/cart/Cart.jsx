import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getUsername } from './cartSlice';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';

function Cart() {
  const username = useSelector(getUsername);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='py-3'>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>

      <h2 className='mt-7 font-medium'>Your cart, {username.split(' ')[0]}</h2>

      <ul className='mt-3 divide-y divide-stone-200 border-b'>
        {cart.map(item => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className='mt-6 flex items-center justify-between'>
        <Button to='/order/new' type='primary'>
          Order pizzas
        </Button>
        <Button type='secondary' onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
