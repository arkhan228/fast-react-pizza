import { useDispatch, useSelector } from 'react-redux';
import { addItem, getCurrentItemQuantity } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import DeleteCartItem from '../cart/DeleteCartItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
import Button from '../../ui/Button';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentItemQuantity(id));

  function handleAdd() {
    dispatch(
      addItem({
        pizzaId: id,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice * 1,
      })
    );
  }

  return (
    <li className='flex gap-4 py-2'>
      <img
        className={`h-24 ${soldOut && 'opacity-70 grayscale'}`}
        src={imageUrl}
        alt={name}
      />
      <div className='flex grow flex-col pt-0.5'>
        <p className='font-medium'>{name}</p>
        <p className='text-sm capitalize italic text-stone-500'>
          {ingredients.join(', ')}
        </p>
        <div className='mt-auto flex items-center justify-between gap-2 text-sm '>
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='font-medium uppercase text-stone-500'>Sold out</p>
          )}

          <div className='flex gap-3 sm:gap-8'>
            {!currentQuantity ? (
              <Button type='small' onClick={handleAdd} disabled={soldOut}>
                Add to cart
              </Button>
            ) : (
              <>
                <UpdateItemQuantity
                  pizzaId={id}
                  currentQuantity={currentQuantity}
                />
                <DeleteCartItem pizzaId={id} />
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
