import { getCartItems, getUserInfo } from '../localStorage';
import { parseRequestUrl } from '../utils';

const Header = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
    const { value } = parseRequestUrl();
    const totalCartItems = JSON.parse(localStorage.cartItems)[0]===undefined?'':JSON.parse(localStorage.cartItems)[0].qty
    const textAppendedAfterCart = totalCartItems>0?`(${totalCartItems})`:'';
    return ` 
  <div class="brand">
    <button id="aside-open-button">
      &#9776;
    </button>
    <a href="/#/">jsamazona</a>
  </div>
  <div class="search">
  <form class="search-form"  id="search-form">
    <input type="text" name="q" id="q" value="${value || ''}" /> 
    <button type="submit"><i class="fa fa-search"></i></button>
  </form>        
  </div>
  <div>
  ${
    name
      ? `<a href="/#/profile">${name}</a>`
      : `<a href="/#/signin">Sign-In</a>`
  }    
    <a href="/#/cart">Cart${textAppendedAfterCart}</a>
    ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ''}
  </div>`;
  },
  after_render: () => {
    window.addEventListener('cartUpdated', () => {
      // Re-render the header when the cart is updated
      document.getElementById('header-container').innerHTML = Header.render();
    });
    document
      .getElementById('search-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchKeyword = document.getElementById('q').value;
        document.location.hash = `/?q=${searchKeyword}`;
      });

    document
      .getElementById('aside-open-button')
      .addEventListener('click', async () => {
        document.getElementById('aside-container').classList.add('open');
      });
  },
};
export default Header;
