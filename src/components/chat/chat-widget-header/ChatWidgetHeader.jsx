import './ChatWidgetHeader.css';

const ChatWidgetHeader = ({ clientName }) => {
  return (
    <div className="sc-header">
      <img className="sc-header--img" src="" alt="" />
      <div className="sc-header--team-name"> Welcome, {clientName} </div>
      {/* <div
        className="sc-header--close-button"
        onClick={() => {
          console.log('close chat window');
        }}
      >
        <img src={closeIcon} alt="" />
      </div> */}
    </div>
  );
};

export default ChatWidgetHeader;
