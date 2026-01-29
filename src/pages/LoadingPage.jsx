import './Pages.scss';

const Loading = () => (
 <div className='loading-screen'>
    <div className='dots-wrapper'>
      <div className='dot'></div>
      <div className='dot'></div>
      <div className='dot'></div>
    </div>
    <span className='loading-label'>Ładowanie twojej strony...</span>
  </div>
);
export default Loading;
