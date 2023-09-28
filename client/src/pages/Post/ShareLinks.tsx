import WhatsappIcon from "../../assets/images/whatsapp_icon.svg";
import FacebookIcon from "../../assets/images/facebook_icon.svg";
import LinkIcon from "../../assets/images/link_icon.svg";
function ShareLinks() {
  const url = window.location.href;
  function copyToClipboard(url: string) {
    navigator.clipboard.writeText(url).then(() => alert("Copied"));
  }
  return (
    <div className="flex gap-5 items-center mr-0">
      <a href={`https://api.whatsapp.com/send?text=Check%20out%20this%20awesome%20post:%20${url}`} target="_blank">
        <img width="24" src={WhatsappIcon} alt="" />
      </a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank">
        <img width="20" src={FacebookIcon} alt="" />
      </a>
      <button className="share-icon" onClick={() => copyToClipboard(url)}>
        <img width="24" src={LinkIcon} alt="copyToClipboard" />
      </button>
    </div>
  );
}

export default ShareLinks;
