  class DataTable {
    constructor(columns = [], data = [], {
        perPageLimit = 5, 
        rowClassName = '',
        tableClassName = '',
        thClassName = '',
        tdClassName = '',
        paginationBoxClassName = '',
        pageItemClassName = '',
        searchFieldClassName = '',
        labelClassName = '',
        checkAllClassName = '',
        pageContainerClassName = '',
        pageActiveClassName = '',
    })
    {
        this.columns = columns;
        this.data = data;
        this.perPageLimit = perPageLimit;
        this.rowClassName = `data__row ${rowClassName}`; 
        this.tableClassName = `datatable ${tableClassName}`;
        this.checkedInput = [];
        this.thClassName = `th__item ${thClassName}`;
        this.tdClassName = `td__item ${tdClassName}`;
        this.paginationBoxClassName = `pagination__box ${paginationBoxClassName}`;
        this.pageItemClassName = `page__item ${pageItemClassName}`;
        this.searchFieldClassName = `search__field ${searchFieldClassName}`;
        this.labelClassName = `label ${labelClassName}`;
        this.checkAllClassName = `check__all ${checkAllClassName}`;
        this.pageContainerClassName =`page__container ${pageContainerClassName}`;
        this.pageActiveClassName = `page__item--active ${pageActiveClassName}`;
    }

    createTable($dataTableContainer) {
        const $table = document.createElement('table');
        $table.setAttribute('class', this.tableClassName);
        this.table = $table;
        $dataTableContainer.appendChild(this.table);
        this.createThead();
        this.createTbody();
        this.renderData();
        this.createPagination();
        this.createInput();
        this.createSearchField();
    }    

    createThead() {
        const $thead = document.createElement('thead');
        const $tr = document.createElement('tr');
        const $thCheck = document.createElement('th');
        $thCheck.setAttribute('class', this.thClassName);
        const $checkinput = document.createElement('input');
        $thCheck.appendChild($checkinput);
        $checkinput.setAttribute('type', 'checkbox');
        $checkinput.setAttribute('class', this.checkAllClassName);

        $checkinput.addEventListener('change', (event) => {
            for(let i = 0; i < document.querySelectorAll('tbody tr').length; i++){
                    document.querySelectorAll('tbody tr input')[i].checked = $checkinput.checked ;
                }                    
            }
        );
        
        $tr.appendChild($thCheck)

        this.columns.forEach((item) => {
            const $th = document.createElement('th');
            $th.setAttribute('class', this.thClassName);
            $th.dataset.filterBy = '';
            $th.innerHTML = item;

            $th.addEventListener('click', (event) => {
                let $clickedItem = event.target;
                if( $clickedItem.dataset.filterBy != (`${item}-asc`)) {
                    $clickedItem.dataset.filterBy = (`${item}-asc`);
                } else{
                    $clickedItem.dataset.filterBy = (`${item}-desc`);
                };
                this.createSorting($clickedItem.dataset.filterBy); 
            })
       
            $tr.appendChild($th);  
        });

            const $dltTh = document.createElement('th');
            $dltTh.setAttribute('class', this.thClassName);
            const $tdBtn = document.createElement('button');
            const $iIcon = document.createElement('i');
            $iIcon.classList.add('fa');
            $iIcon.classList.add('fa-trash');
            $tdBtn.appendChild($iIcon);
            $dltTh.appendChild($tdBtn)
            $tr.appendChild($dltTh);

            $iIcon.addEventListener('click', (event) =>{
                if($checkinput.checked){
                    for(let i = 0; i < this.perPageLimit; i++){
                        this.checkedInput.push(document.querySelectorAll('tbody tr input')[i].dataset.currentId);
                    }

                    this.data = this.data.filter((item) => !this.checkedInput.includes((item.id).toString()))
                    this.table.querySelector('tbody').innerHTML = null;
                    document.querySelector('.page__container').innerHTML = null;
                    $checkinput.checked = false;
                    this.createPagination();           
                    this.renderData();
                } else {
                    for(let i = 0; i < this.perPageLimit; i++){
                        if(document.querySelectorAll('tbody tr input')[i].checked){
                            this.checkedInput.push(document.querySelectorAll('tbody tr input')[i].dataset.currentId);
                        }
                    }

                    this.data = this.data.filter((item) => !this.checkedInput.includes((item.id).toString()))
                    this.table.querySelector('tbody').innerHTML = null;
                    document.querySelector('.page__container').innerHTML = null;
                    $checkinput.checked = false;
                    this.createPagination();           
                    this.renderData();
                }
            })

            this.table.appendChild($thead);
            $thead.appendChild($tr);
    }
    
    createTbody() {
        const $tbody = document.createElement('tbody');
        this.table.appendChild($tbody);
    }
    
    renderData() {
        this.displayList(0, this.perPageLimit);
    }
        
    createPagination(){
        if(this.data.length > this.perPageLimit) {
            const $pageInfo = document.createElement('div');
            document.querySelector('body').appendChild($pageInfo)
            $pageInfo.setAttribute('class', this.pageContainerClassName)
            const paginationBox = document.createElement('div');
            const pageNumber = Math.ceil(this.data.length / this.perPageLimit);
            paginationBox.setAttribute('class', this.paginationBoxClassName);
    
            for(let i = 1; i <= pageNumber; i++){
                const $pageButton = document.createElement('button');
                $pageButton.setAttribute('class', this.pageItemClassName);
                $pageButton.innerHTML = i;
                paginationBox.appendChild($pageButton);

                if( i == 1 ){
                    $pageButton.classList.add('page__item--active');
                }
            }
    
            document.querySelector('.data-table-container').appendChild(paginationBox);
            document.querySelector('.page__container').appendChild(paginationBox);
            const dataTable = this;

            document.querySelectorAll('.page__item').forEach((eachItem) => { 
                eachItem.addEventListener('click', function(){
                if(document.querySelector('.page__item--active')){
                    document.querySelector('.page__item--active').classList.remove('page__item--active');
                }

                this.classList.add('page-active');
                let start = dataTable.perPageLimit * parseInt(this.innerHTML - 1);
                let end = dataTable.perPageLimit + start
                document.querySelector('tbody').replaceChildren();
                dataTable.displayList(start, end);
                }) 
            }) 
        }
    }

    createInput() {
        const $tableOptions = document.createElement('div')
        $tableOptions.classList.add('table-options');
        document.querySelector('body').appendChild($tableOptions);
        const $label = document.createElement('label');
        $label.setAttribute('class', this.labelClassName)
        const $select = document.createElement('select');
        const dataTable = this;

        const $option1 = document.createElement('option');
        $option1.innerHTML = 5;
        const $option2 = document.createElement('option');
        $option2.innerHTML = 10;
        const $option3 = document.createElement('option');
        $option3.innerHTML = 15;
        const $option4 = document.createElement('option');
        $option4.innerHTML = 20;
    
        $select.appendChild($option1);
        $select.appendChild($option2);
        $select.appendChild($option3);
        $select.appendChild($option4);
    
        $label.appendChild($select);
        document.querySelector('.table-options').appendChild($label);

        $select.addEventListener('change', (event) => {
            this.table.querySelector('tbody').innerHTML = null;    
            document.querySelector('.page__container').innerHTML = null;
            dataTable.perPageLimit = +event.target.value;
            dataTable.createPagination();
            dataTable.renderData();
        })
    }
    
    displayList(startCount, endCount) {
        const eachPageItems = this.data.slice(startCount, endCount);
        eachPageItems.forEach((item) => {
            const $tr = document.createElement('tr');
            $tr.setAttribute('class', this.rowClassName);
            const $checkTd = document.createElement('td');
            $checkTd.setAttribute('class', this.tdClassName);
            const $checkInput = document.createElement('input')
            $checkInput.setAttribute('type', 'checkbox');
            $checkTd.appendChild($checkInput);
            $tr.appendChild($checkTd);
            $checkInput.dataset.currentId = item.id;

            for(const key in item) {
                const $td = document.createElement('td');
                $td.innerHTML = item[key];
                $tr.appendChild($td);
                $td.setAttribute('class', this.tdClassName);
            }

            $checkInput.addEventListener('change',(event) => {
                item.id == event.target.dataset.currentId
                this.checkedInput.push(item.id)
                const $checkedCount = document.querySelectorAll('tbody tr input:checked').length;

                for(let i = 0; i < document.querySelectorAll('tbody tr').length; i++){
                
                    if($checkedCount == this.perPageLimit){
                        document.querySelector('thead tr input').checked = true;

                    } else {
                        document.querySelector('thead tr input').checked = false;
                    }
                }
            })

            const $deleteTd = document.createElement('td');
            $deleteTd.setAttribute('class', this.tdClassName);
            const $tdBtn = document.createElement('button');
            const $iIcon = document.createElement('i');
            $iIcon.classList.add('fa');
            $iIcon.classList.add('fa-trash');
            $iIcon.dataset.currentRowId = item.id;
            $tdBtn.appendChild($iIcon)

            $iIcon.addEventListener('click', (event) => {
                this.data = this.data.filter((item) => item.id != event.target.dataset.currentRowId)

                if(document.querySelector('.check__all').checked){
                    this.data = this.data.filter((item) => item.id != document.querySelector('.check__all'))
                }

                this.table.querySelector('tbody').innerHTML = null;
                document.querySelector('.page__container').innerHTML = null;
                this.createPagination();           
                this.renderData();
            })

            $deleteTd.appendChild($tdBtn);
            $tr.appendChild($deleteTd);
            document.getElementsByTagName('tbody')[0].appendChild($tr);
        })
    }

    createSorting(currentElement) {
        this.data.sort((a, b) => {
            if(currentElement == 'id-asc'){
                return a.id - b.id
            } else  if(currentElement == 'id-desc'){
                return b.id - a.id
            } else if(currentElement == 'name-desc'){
                if(a.name > b.name){
                    return -1
                } else if(a.name < b.name){
                    return 1
                }
            } else if(currentElement == 'name-asc'){
                if(a.name > b.name){
                    return 1
                } else if(a.name < b.name){
                    return -1
                }
            } else if(currentElement == 'age-asc'){
                return a.age - b.age
            } else {
                return b.age - a.age
            }
        }) 
        this.table.querySelector('tbody').innerHTML = null; 
        document.querySelector('.page__container').innerHTML = null; 
        this.renderData();
        this.createPagination();
    }

    createSearchField(){
        const $input = document.createElement('input');
        $input.setAttribute('class', this.searchFieldClassName)
        $input.setAttribute("type", "search");
        $input.placeholder = 'search';
        document.querySelector('.data-table-container').prepend($input);
        const test = this.data

        $input.onchange = (event) => {
            const searchResult = [];
            let noResult = false;
            
            this.data.map((item) => {
                for(const key in item) {
                    if(item[key].toString().toLowerCase().startsWith($input.value.toLowerCase())){
                        searchResult.push(item);
                  }
                }
            })

            document.querySelector('tbody').innerHTML = null;

            if(searchResult.length > 0) {
                this.data = searchResult;
                this.table.querySelector('tbody').innerHTML = null;
                document.querySelector('.page__container').innerHTML = null;
                this.createPagination();           
                this.renderData();
                this.data = test;
            } else {
                const $tr = document.createElement('tr');
                const $noResultTd = document.createElement('td');
                $noResultTd.colSpan = this.columns + 2;
                $noResultTd.innerHTML = 'No Result';
                $tr.appendChild($noResultTd);
                document.querySelector('tbody').appendChild($tr);
            }
        }
    } 
}

export default DataTable
