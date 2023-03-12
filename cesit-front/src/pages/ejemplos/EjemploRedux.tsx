import { increment, incrementByAmount } from '../../slices/counterSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const EjemploRedux = () => {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>EjemploRedux</h1>

      <p>Counter: {value}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>

      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment x 5
      </button>
    </div>
  );
};

export default EjemploRedux;
