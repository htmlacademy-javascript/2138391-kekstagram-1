import {renderMidgets} from './midget.js';
import { debounce } from './util.js';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSS: 'filter-discussed'
};

const FILTERED_COUNT = 10;

const filterSection = document.querySelector('.img-filters');

let midgets = [];

let currentFilter = Filter.DEFAULT;

const randomSort = () => Math.random() - 0.5;

const filteredMidgets = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...midgets].sort(randomSort).slice(0, FILTERED_COUNT);
    case Filter.DISCUSS:
      return [...midgets].sort((midgetA, midgetB) => midgetB.comments.length - midgetA.comments.length);
    case Filter.DEFAULT:
      return [...midgets];
  }
};

const debounceRenderMidgets = debounce(renderMidgets, 1000);

const removeInactiveClass = (response) => {
  filterSection.classList.remove('img-filters--inactive');
  midgets = response;
  filterSection.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return undefined;
    } else if (evt.target.id === currentFilter) {
      return undefined;
    } else {
      currentFilter = evt.target.id;
      filterSection.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      const result = filteredMidgets();
      debounceRenderMidgets(result);
    }
  });
};

export {filteredMidgets, removeInactiveClass};
