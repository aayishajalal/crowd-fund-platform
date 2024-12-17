const SocialShare = ({ url }) => {
    return (
      <div className="social-share">
        <a href={`https://twitter.com/share?url=${url}`} target="_blank" rel="noreferrer">
          Share on Twitter
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noreferrer">
          Share on Facebook
        </a>
      </div>
    );
  };
  
  export default SocialShare;
  