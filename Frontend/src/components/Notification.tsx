import { useEffect } from 'react';

const Notification = ({ text, type, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [onRemove]);

  let backgroundColor;
  let textColor;
  if (type === 'error') {
    backgroundColor = 'bg-red-500';
    textColor = 'text-white';
  } else if (type === 'alert') {
    backgroundColor = 'bg-yellow-500';
    textColor = 'text-black';
  } else {
    backgroundColor = 'bg-green-500';
    textColor = 'text-white';
  }

  return (
    <div className={`flex items-center justify-between p-4 rounded-md mt-4 ${backgroundColor} ${textColor} shadow-md`}>
      <div>{text}</div>
      <button
        onClick={onRemove}
        className="ml-4 p-2 rounded-full focus:outline-none hover:bg-opacity-75"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Notification;
