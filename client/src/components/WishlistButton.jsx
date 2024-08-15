function WishlistButton({ equipment }) {
  return (
    <button
      name="wishlist"
      className="btn btn-sm btn-primary text-green-800 border-green-500 hover:bg-green-200 shadow-sm hover:border-2"
      onClick={() => console.log(equipment._id)}
    >
      Add to Wishlist
    </button>
  );
}

export default WishlistButton;
