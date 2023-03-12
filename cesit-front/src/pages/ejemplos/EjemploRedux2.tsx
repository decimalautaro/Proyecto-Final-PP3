import { increment } from '../../slices/counterSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const EjemploRedux2 = () => {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>EjemploRedux 2</h1>

      <p>Counter: {value}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
};

export default EjemploRedux2;
