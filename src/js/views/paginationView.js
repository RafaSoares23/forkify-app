import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            if(!btn) return
            
            const goToPage = +btn.dataset.goto;
            //console.log(goToPage);

            handler(goToPage);
        })
    }

    _generateMarkup() {
        const currPage = this._data.page;
        //take number of page
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        //console.log(numPages)

        //Page 1 and there are other pages
        if(currPage  === 1 && numPages > 1) {
            return this._generateMarkupBtn('next', currPage);
        }
        
        //Last Page
        if(numPages > 1 && currPage === numPages) {
            return this._generateMarkupBtn('prev', currPage);
        }
        //Other Page
        if(currPage < numPages) {
            return [
                this._generateMarkupBtn('prev', currPage),
                this._generateMarkupBtn('next', currPage),
            ].join(' ');
        }

        //Page 1 and there are NO other pages
        return '';
    }

    _generateMarkupBtn(dir, currPage) {
        return `
        <button class="btn--inline pagination__btn--${dir}" data-goto="${dir === 'next' ? currPage + 1: currPage - 1}">
            <span>Page ${dir === 'next' ? currPage + 1: currPage - 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-${dir === 'next' ? 'right': 'left'}"></use>
            </svg>
        </button>
        `
    }
}

export default new PaginationView();