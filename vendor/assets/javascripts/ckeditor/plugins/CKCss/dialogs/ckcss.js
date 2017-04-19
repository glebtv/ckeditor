var _editor;
(function () {

    var _positionVar = ['Top', 'Right', 'Bottom', 'Left'];
    var _pageUsedElem = new Hash();
    var imagePreviewBoxId = CKEDITOR.tools.getNextId() + '_imgPreview';

    function distPreview(dlg, cssText) {
        var prw1 = CKEDITOR.document.getById(imagePreviewBoxId);
        var prw2 = CKEDITOR.document.getById(imagePreviewBoxId + '2');
        var prw3 = CKEDITOR.document.getById(imagePreviewBoxId + '3');
        var prw4 = CKEDITOR.document.getById(imagePreviewBoxId + '4');
        var prw5 = CKEDITOR.document.getById(imagePreviewBoxId + '5');
        var prw6 = CKEDITOR.document.getById(imagePreviewBoxId + '6');
        var prw7 = CKEDITOR.document.getById(imagePreviewBoxId + '7');
        var prw8 = CKEDITOR.document.getById(imagePreviewBoxId + '8');
        var prw9 = CKEDITOR.document.getById(imagePreviewBoxId + '9');
        var prwH1 = dlg.getContentElement('page1', 'stylePreview');
        var prwH2 = dlg.getContentElement('page2', 'stylePreview');
        var prwH3 = dlg.getContentElement('page3', 'stylePreview');
        var prwH4 = dlg.getContentElement('page4', 'stylePreview');
        var prwH5 = dlg.getContentElement('page5', 'stylePreview');
        var prwH6 = dlg.getContentElement('page6', 'stylePreview');
        var prwH7 = dlg.getContentElement('page7', 'stylePreview');
        var prwH8 = dlg.getContentElement('page8', 'stylePreview');
        var prwH9 = dlg.getContentElement('page9', 'stylePreview');

        prwH1.setValue(cssText);
        prwH2.setValue(cssText);
        prwH3.setValue(cssText);
        prwH4.setValue(cssText);
        prwH5.setValue(cssText);
        prwH6.setValue(cssText);
        prwH7.setValue(cssText);
        prwH8.setValue(cssText);
        prwH9.setValue(cssText);

        prw1.$.style.cssText = cssText;
        prw2.$.style.cssText = cssText;
        prw3.$.style.cssText = cssText;
        prw4.$.style.cssText = cssText;
        prw5.$.style.cssText = cssText;
        prw6.$.style.cssText = cssText;
        prw7.$.style.cssText = cssText;
        prw8.$.style.cssText = cssText;
        prw9.$.style.cssText = cssText;

    }


    function getParentTabName(elem) {
        var element = elem.getInputElement(),
            cursor = element;
        while ((cursor = cursor.getParent()) && cursor.$.className.search('cke_dialog_page_contents') == -1)
        { /*jsl:pass*/ }


        if (!cursor)
            return null;
        return cursor.getAttribute('name');
    }

    function getParentTabElem(dlg, pageName) {
        for (var i = 0; i < dlg.parts.tabs.$.children.length; i++) {
            if (dlg.parts.tabs.$.children[i].id.indexOf('cke_' + pageName) != -1) {
                return dlg.parts.tabs.$.children[i];
            }
        }
        return null;
    }

    function isPageUsed(pageName, curStyle, cnt) {
        if (cnt == 1) {
            if (!_pageUsedElem.hasItem(curStyle)) _pageUsedElem.setItem(curStyle, pageName);
            return true;
        } else {
            _pageUsedElem.removeItem(curStyle);
        }

        for (var itm in _pageUsedElem.items) {
            if (_pageUsedElem.getItem(itm) == pageName) return true;
        }
        return false;
    }

    function boldTab(elem) {

        var dlg = elem.getDialog();
        var pageUsed = false;
        var relTab = getParentTabElem(dlg, getParentTabName(elem));
        var pageName = getParentTabName(elem);
        var _vl = elem.getValue();
        //if (_vl != ' ') {
        if ((_vl == '') || (_vl == ' ')) {
            pageUsed = isPageUsed(pageName, elem.id, -1)
        } else {
            pageUsed = isPageUsed(pageName, elem.id, +1)
        }
        if (pageUsed) {
            relTab.style.fontWeight = 'bold';
            relTab.style.color = '#990000';
        } else {
            relTab.style.fontWeight = '';
            relTab.style.color = '';
        }
        //}
    }

    function findElement(dlg, elemId) {
        for (var i = 0; i < dlg.definition.contents.length; i++) {
            var elem = dlg.getContentElement(dlg.definition.contents[i].id, elemId);
            if (elem != null) {
                return elem;
            }

        }
    }

    function gestUm(elem) {
        var dialog = elem.getDialog();
        var um = findElement(dialog, elem.id + 'Um');
        if (um != null) {
            if (elem.isEnabled()) {
                if (isNumeric(elem.getValue())) um.enable(); else um.disable();
            } else {
                um.disable();
            }
        }
    }

    function arContains(arr, obj) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].value == obj) return i;
        }
        return -1;
    }

    function selectOnKeyDownAll(elem, pre, post, page, ev) {
        var dialog = elem.getDialog();
        var _val = elem.getValue();
        var _topElem = dialog.getContentElement(page, pre + 'Top' + post);
        for (var i = 0; i < _positionVar.length; i++) {
            if (_positionVar[i] != 'Top') {
                var elem = dialog.getContentElement(page, pre + _positionVar[i] + post);
                selectOnKeyDown(elem, ev);
            }
        }
    }

    function selectOnKeyUpAll(elem, pre, post, page, ev) {
        var dialog = elem.getDialog();
        var _val = elem.getValue();
        var _topElem = dialog.getContentElement(page, pre + 'Top' + post);
        for (var i = 0; i < _positionVar.length; i++) {
            if (_positionVar[i] != 'Top') {
                var elem = dialog.getContentElement(page, pre + _positionVar[i] + post);
                selectOnKeyUp(elem, ev);
            }
        }
    }

    function selectOnKeyPressAll(elem, pre, post, page, ev) {
        var dialog = elem.getDialog();
        var _val = elem.getValue();
        var _topElem = dialog.getContentElement(page, pre + 'Top' + post);
        for (var i = 0; i < _positionVar.length; i++) {
            if (_positionVar[i] != 'Top') {
                var elem = dialog.getContentElement(page, pre + _positionVar[i] + post);
                selectOnKeyPress(elem, ev);
            }
        }
    }

    function setAll(elem, pre, post, page) {
        var dialog = elem.getDialog();
        var _val = elem.getValue();
        var _topElem = dialog.getContentElement(page, pre + 'Top' + post);
        for (var i = 0; i < _positionVar.length; i++) {
            if (_positionVar[i] != 'Top') {
                var elem = dialog.getContentElement(page, pre + _positionVar[i] + post);
                if (_val) {
                    elem.disable();
                    elem.setValue(_topElem.getValue());
                } else {
                    elem.enable();
                }
            }
        }
    }

    function elemSetup(elem, _style) {
        var _value 	= _style[elem.id];
        var editor 	= elem.getDialog().getParentEditor();
        var overType = editor.lang.CKCss.value;

        if (elem.id=='clipTop') _value = _style['clip'];
        if ((_value != undefined) && (_value != '')) {
            if (elem.id=='clipTop') {
                var dialog = elem.getDialog();
                var values = _style['clip'].replace('rect(','').replace(')','').split(',');
                var page = getParentTabName(elem);
                for (var i = 0; i < _positionVar.length; i++) {
                    var elemClip = dialog.getContentElement(page,'clip' + _positionVar[i]);
                    selectSetValue(elemClip,values[i]);
                }
            } else {
                switch (elem.type) {
                    case 'select':
                        selectSetValue(elem,_value);
                        break;
                    default:
                        elem.setValue(_value, _value);
                        break;
                }
            }
        } else {
            switch (elem.type) {
                case 'select':
                    gestUm(elem);
            }
        }
        boldTab(elem);
    }

    function selectSetValue(elem,_value) {
        gestUm(elem);
        if (arContains(elem.getInputElement().$.options, _value) > -1) {
            elem.setValue(_value, _value);
        } else {
            if (arContains(elem.getInputElement().$.options, ' ') > -1) {
                elem.remove(0);
            }
            var dialog = elem.getDialog();
            var um = findElement(dialog, elem.id + 'Um');
            if (um != null) {
                if (_value.length > 2) {
                    var _umValue = _value.substring(_value.length - 2, _value.length)
                    var _value = _value.replace(_umValue, '');
                }
                if (isNumeric(_value)) {
                    um.setValue(_umValue);
                    um.enable();
                } else {
                    um.disable();
                }
            }
            elem.add(_value, _value, null);
            elem.setValue(_value);
        }
    }

    function selectOnKeyDown(elem, ev) {
        var obj = elem.getInputElement().$;
        ev = ev.data.$;
        fnKeyDownHandler_A(obj, ev);
    }

    function selectOnKeyUp(elem, ev) {
        var obj = elem.getInputElement().$;
        ev = ev.data.$;
        fnKeyUpHandler_A(obj, ev);
        gestUm(elem);
        preview(elem);
    }

    function selectOnKeyPress(elem, ev) {
        var obj = elem.getInputElement().$;
        ev = ev.data.$;
        return fnKeyPressHandler_A(obj, ev);
    }

    function selectOnChange(elem, ev) {
        var obj = elem.getInputElement().$;
        ev = ev.data.$;
        fnChangeHandler_A(obj, ev);
        preview(elem);

        var sel  = elem.getInputElement();
        var editor 	= elem.getDialog().getParentEditor();
        var overType	= editor.lang.CKCss.value;
        var selIndex = obj.selectedIndex;
        var selectedtxt = obj.options[selIndex].text;

        var opts 	= sel.getChildren();
        var opt 	= opts.getItem(selIndex);

        if(selectedtxt == overType || opt.hasClass('cssEditable'))
        {
            var className =  sel.getAttribute('class')
            sel.setAttribute('class',className +' selectOvertype');
            opt.setAttribute('class','cssEditable');
        }
        else
        {
            var className =  sel.getAttribute('class');
            className =  className.replace(' selectOvertype','');
            sel.setAttribute('class',className);
        }
    }

    function preview(elem) {
        var dialog = elem.getDialog();
        var prw = CKEDITOR.document.getById(imagePreviewBoxId);
        var _vl = elem.getValue();
        var _style=elem.id;
        var dlg=elem.getDialog();

        //files
        if ((_style == 'backgroundImage') || (_style == 'listStyleImage')) {
            if(!_vl.match(/:\/\//))
                _vl = _editor.config.baseHref + _vl;
            _vl = 'url(\'' + _vl + '\')';
        }

        //clip:rect
        if ((_style=='clipLeft')||(_style=='clipTop')||(_style=='clipBottom')||(_style=='clipRight')) {
            var _notSet=true;
            var elemPage=getParentTabName(elem);
            var cur=_style.replace('clip','');
            _vl='rect(';
            for (var i = 0; i < _positionVar.length; i++) {
                var cElem=dlg.getContentElement(elemPage,'clip' + _positionVar[i] );
                var cElemUm=dlg.getContentElement(elemPage,'clip' + _positionVar[i] + "Um");
                var _tmp=cElem.getValue();

                if ((_tmp!=' ') && (_tmp!='')) {
                    _notSet=false;
                    if (isNumeric(_tmp)) _tmp+=cElemUm.getValue(); else _tmp='auto';
                } else{
                    _tmp='auto';
                }
                _vl+=_tmp + ',';
            }
            _style='clip';
            if (!_notSet) {
                _vl=_vl.substr(0,_vl.length-1) + ')';
            } else {
                /* ie non consente di impostare clip=''*/
                if (CKEDITOR.env.ie) {
                    _vl='rect(auto,auto,auto,auto)';
                } else {
                    _vl='';
                }

            }
        }

        if ((_vl != ' ') && (_vl != '')) {
            if (isNumeric(_vl)) {
                var um = findElement(dialog, _style + 'Um');
                if (um != null) {
                    _vl = _vl + um.getValue();
                }
            }
            prw.setStyle(_style, _vl);
        } else {
            prw.removeStyle(_style);
        }

        prw.$.style.cssText = prw.$.style.cssText.replace(/\/administrator\//g,'/');

        distPreview(dialog, prw.$.style.cssText);
        boldTab(elem);
        //        var prwH = dialog.getContentElement('page1', 'stylePreview');
        //        prwH.setValue(prw.$.style.cssText);
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }


    var exampleDialog = function (editor) {
        _editor=editor;
        var _fontName = [[editor.lang.CKCss.notSet, ''],['Arial', 'arial, helvetica, sans-serif'], ['Comic Sans MS', 'comic sans ms, cursive'], ['Courier New', 'courier new, courier, monospace'],
            ['Georgia', 'georgia, serif'], ['Lucida Sans Unicode', 'lucida sans unicode, lucida grande, sans-serif'], ['Tahoma', 'tahoma, geneva, sans-serif'], ['Times New Roman', 'times new roman, times, serif'], ['Trebuchet MS', 'trebuchet ms, helvetica, sans-serif'], ['Verdana', 'verdana, geneva, sans-serif']];
        var _fontSize = [[editor.lang.CKCss.value, ' '], ['xx-small', 'xx-small'], ['x-small', 'x-small'], ['small', 'small'], ['medium', 'medium'], ['large', 'large'], ['x-large', 'x-large'], ['xx-large', 'xx-large'], ['smaller', 'smaller'], ['larger', 'larger'], [editor.lang.CKCss.notSet, '']];
        var _um = [['px', 'px'], ['pt', 'pt'], ['in', 'in'], ['cm', 'cm'], ['mm', 'mm'], ['pc', 'pc'], ['em', 'em'], ['ex', 'ex'], ['%', '%']];
        var _fontWeight = [[editor.lang.CKCss.notSet, ''], ['normal', 'normal'], ['bold', 'bold'], ['lighter', 'lighter'], ['bolder', 'bolder'], ['100', '100'], ['200', '200'], ['300', '300'], ['400', '400'], ['500', '500'], ['600', '600'], ['700', '700'], ['800', '800'], ['900', '900']]
        var _fontStyle = [[editor.lang.CKCss.notSet, ''], ['italic', 'italic'], ['normal', 'normal'], ['oblique', 'oblique']]
        var _fontVariant = [[editor.lang.CKCss.notSet, ''], ['normal', 'normal'], ['small-caps', 'small-caps']]
        var _textTransform = [[editor.lang.CKCss.notSet, ''], ['capitalize', 'capitalize'], ['lowercase', 'lowercase'], ['none', 'none'], ['uppercase', 'uppercase']]
        var _textDecoration = [['underline', 'underline'], ['overline', 'overline'], ['line-through', 'line-through'], ['blink', 'blink'], ['none', 'none']]
        var _common2 = [[editor.lang.CKCss.value, ' '], [editor.lang.CKCss.notSet, '']];
        var _common3 = [[editor.lang.CKCss.value, ' '], ['auto', 'auto'], [editor.lang.CKCss.notSet, '']];
        var _common = [[editor.lang.CKCss.value, ' '], ['normal', 'normal'], [editor.lang.CKCss.notSet, '']];
        var _verticalAlign = [[editor.lang.CKCss.value, ' '], ['baseline', 'baseline'], ['bottom', 'bottom'], ['middle', 'middle'], ['sub', 'sub'], ['super', 'super'], ['text-bottom', 'text-bottom'], ['text-top', 'text-top'], ['top', 'top'], [editor.lang.CKCss.notSet, '']];
        var _textAlign = [['center', 'center'], ['justify', 'justify'], ['left', 'left'], ['right', 'right'], [editor.lang.CKCss.notSet, '']];
        var _whiteSpace = [['normal', 'normal'], ['nowrap', 'nowrap'], ['pre', 'pre'], ['pre-line', 'pre-line'], ['pre-wrap', 'pre-wrap'], [editor.lang.CKCss.notSet, '']];
        var _backgroundRepeat = [[editor.lang.CKCss.notSet, ''], ['no-repeat', 'no-repeat'], ['repeat', 'repeat'], ['repeat-x', 'repeat-x'], ['repeat-y', 'repeat-y']];
        var _backgroundAttachment = [[editor.lang.CKCss.notSet, ''], ['fixed', 'fixed'], ['scroll', 'scroll']];
        var _backgroundPositionX = [[editor.lang.CKCss.value, ' '], ['center', 'center'], ['left', 'left'], ['right', 'right'], [editor.lang.CKCss.notSet, '']];
        var _backgroundPositionY = [[editor.lang.CKCss.value, ' '], ['bottom', 'bottom'], ['center', 'center'], ['top', 'top'], [editor.lang.CKCss.notSet, '']];
        var _borderStyle = [[editor.lang.CKCss.notSet, ''], ['dashed', 'dashed'], ['dotted', 'dotted'], ['double', 'double'], ['groove', 'groove'], ['hidden', 'hidden'], ['inset', 'inset'], ['none', 'none'], ['outset', 'outset'], ['ridge', 'ridge'], ['solid', 'solid']];
        var _borderWidth = [[editor.lang.CKCss.value, ' '], ['thin', 'thin'], ['medium', 'medium'], ['thick', 'thick'], [editor.lang.CKCss.notSet, '']];
        var _position = [[editor.lang.CKCss.notSet, ''], ['absolute', 'absolute'], ['fixed', 'fixed'], ['relative', 'relative'], ['static', 'static']];
        var _visibility = [[editor.lang.CKCss.notSet, ''], ['collapse', 'collapse'], ['hidden', 'hidden'], ['visible', 'visible']];
        var _overflow = [[editor.lang.CKCss.notSet, ''], ['auto', 'auto'], ['hidden', 'hidden'], ['scroll', 'scroll'], ['visible', 'visible']];
        var _display = [[editor.lang.CKCss.notSet, ''], ['block', 'block'], ['inline', 'inline'], ['inline-block', 'inline-block'], ['inline-table', 'inline-table'], ['list-item', 'list-item'], ['none', 'none'], ['run-in', 'run-in'], ['table', 'table'], ['table-caption', 'table-caption'], ['table-cell', 'table-cell'], ['table-column', 'table-column'], ['table-column-group', 'table-column-group'], ['table-footer-group', 'table-footer-group'], ['table-header-group', 'table-header-group'], ['table-row', 'table-row'], ['table-row-group', 'table-row-group']];
        var _float = [[editor.lang.CKCss.notSet, ''], ['left', 'left'], ['none', 'none'], ['right', 'right']];
        var _clear = [[editor.lang.CKCss.notSet, ''], ['both', 'both'], ['left', 'left'], ['none', 'none'], ['right', 'right']];
        var _cursor = [[editor.lang.CKCss.notSet, ''], ['auto', 'auto'], ['crosshair', 'crosshair'], ['default', 'default'], ['e-resize', 'e-resize'], ['help', 'help'], ['move', 'move'], ['n-resize', 'n-resize'], ['ne-resize', 'ne-resize'], ['nw-resize', 'nw-resize'], ['pointer', 'pointer'], ['progress', 'progress'], ['s-resize', 's-resize'], ['se-resize', 'se-resize'], ['sw-resize', 'sw-resize'], ['text', 'text'], ['w-resize', 'w-resize'], ['wait', 'wait']];
        var _listStyleType = [[editor.lang.CKCss.notSet, ''], ['disc', 'disc'], ['circle', 'circle'], ['square', 'square'], ['decimal', 'decimal'], ['decimal-leading-zero', 'decimal-leading-zero'], ['lower-roman', 'lower-roman'], ['upper-roman', 'upper-roman'], ['lower-greek', 'lower-greek'], ['lower-latin', 'lower-latin'], ['upper-latin', 'upper-latin'], ['armenian', 'armenian'], ['georgian', 'georgian'], ['lower-alpha', 'lower-alpha'], ['upper-alpha', 'upper-alpha'], ['none', 'none']];
        var _listStylePosition = [[editor.lang.CKCss.notSet, ''], ['inside', 'inside'], ['outside', 'outside']];
        var _tableLayout = [[editor.lang.CKCss.notSet, ''], ['auto', 'auto'], ['fixed', 'fixed']];
        var _borderCollapse = [[editor.lang.CKCss.notSet, ''], ['collapse', 'collapse'], ['separate', 'separate']];
        var _emptyCells = [[editor.lang.CKCss.notSet, ''], ['hide', 'hide'], ['show', 'show']];
        var _captionSide = [[editor.lang.CKCss.notSet, ''], ['bottom', 'bottom'], ['top', 'top']];
        function getDialogValue(dialogName, callback) {
            var onOk = function () {
                releaseHandlers(this);
                callback(this, this._.parentDialog);
                this._.parentDialog.changeFocus(true);
            };
            var onCancel = function () {
                releaseHandlers(this);
                this._.parentDialog.changeFocus();
            };
            var releaseHandlers = function (dialog) {
                dialog.removeListener('ok', onOk);
                dialog.removeListener('cancel', onCancel);
            };
            var bindToDialog = function (dialog) {
                dialog.on('ok', onOk);
                dialog.on('cancel', onCancel);
            };
            editor.execCommand(dialogName);
            if (editor._.storedDialogs.colordialog)
                bindToDialog(editor._.storedDialogs.colordialog);
            else {
                CKEDITOR.on('dialogDefinition', function (e) {
                    if (e.data.name != dialogName)
                        return;

                    var definition = e.data.definition;

                    e.removeListener();
                    definition.onLoad = CKEDITOR.tools.override(definition.onLoad, function (orginal) {
                        return function () {
                            bindToDialog(this);
                            definition.onLoad = orginal;
                            if (typeof orginal == 'function')
                                orginal.call(this);
                        };
                    });
                });
            }
        }
        
        return {
            title: 'CKCss Editor',
            minWidth: 550,
            minHeight: 400,
            buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton],
            onOk: function () {
                var elem = null; //get the current selected element
                var t = this;
                if ( !this._.selectedElement )
                {
                    if (!this._.selectedElements) {
                        var prwH = this.getContentElement('page1', 'stylePreview');
                        var cssText = 	prwH.getValue();

                        // Apply style.
                        var style = new CKEDITOR.style( { element : 'span', attributes : {style : cssText } } );
                        style.type = CKEDITOR.STYLE_INLINE;		// need to override... dunno why.
                        style.apply( editor.document );
                    } else {
                        var elem;
                        this._.selectedElements.forEach(function(elem) {
                            var prwH = t.getContentElement('page1', 'stylePreview');
                            var cssText = 	prwH.getValue();
                            if(!cssText && !elem.hasAttribute('class') && !elem.hasAttribute('id') && elem.is('span'))
                                elem.setAttribute('id','data-remove-span'); //mark to remove
                            elem.$.style.cssText = prwH.getValue();
                        });
                        delete this._.selectedElements;
                    }
                }
                else
                {
                    elem = this._.selectedElement;
                    var prwH = this.getContentElement('page1', 'stylePreview');
                    var cssText = 	prwH.getValue();
                    if(!cssText && !elem.hasAttribute('class') && !elem.hasAttribute('id') && elem.is('span'))
                        elem.setAttribute('id','data-remove-span'); //mark to remove
                    elem.$.style.cssText = prwH.getValue();

                    delete this._.selectedElement;
                }
            },
            onLoad: onLoad(),
            onShow: function () {
                this.parts.dialog.$.classList.add("ckcss-dialog");
                var elem = null,
                    elems = null,
                    selection = this.getParentEditor().getSelection();

                if ( selection.getType() == CKEDITOR.SELECTION_ELEMENT ) {
                    elem = selection.getSelectedElement();
                } else {
                    var range = selection.getRanges( true )[ 0 ];
                    range.shrink( CKEDITOR.SHRINK_ELEMENT );

                    var root = range.getCommonAncestor();
                    if(root &&  (root.type == CKEDITOR.NODE_ELEMENT && root.is('div') || CKEDITOR.NODE_ELEMENT && root.is('td')))
                        elem = root;

                    if(elem == null){
                        range.shrink( CKEDITOR.SHRINK_TEXT );
                        root = range.getCommonAncestor();
                        if(root && root.type == CKEDITOR.NODE_ELEMENT && root.is('p'))
                            elem = root;
                        if(elem == null)
                            elem = root.getAscendant( 'a', true );
                        if(elem == null)
                            elem = root.getAscendant( 'span', true );

                    }
                    if (elem == null) {
                        var iterator = range.createIterator(),
                            enterMode = editor.config.enterMode;
                        iterator.enforceRealBlocks = true;
                        iterator.enlargeBr = enterMode != CKEDITOR.ENTER_BR;
                        var block;
                        elems = [];
                        while ( ( block = iterator.getNextParagraph( enterMode == CKEDITOR.ENTER_P ? 'p' : 'div' ) ) ) {
                            elems.push(block);
                        }
                    }

                }

                if (elem != null) {
                    //var prw = CKEDITOR.document.getById(imagePreviewBoxId);
                    //var prwH = this.getContentElement('page1', 'stylePreview');
                    //prwH.setValue(elem.$.style.cssText);
                    //prw.$.style.cssText = elem.$.style.cssText;
                    this._.selectedElement = elem;
                    distPreview(this, elem.$.style.cssText);
                    this.setupContent(elem.$.style);
                } else if (elems != null) {
                    this._.selectedElements = elems;
                    distPreview(this, elems[0].$.style.cssText);
                    this.setupContent(elems[0].$.style);
                }
            },
            onHide: onHide(),
            onCancel: onCancel(),
            resizable: 'none' /* none,width,height or both  */,
            contents: [{
                id: 'page1',
                label: editor.lang.CKCss.tabPage1,
                accessKey: 'P',
                elements: [{
                    type: 'vbox',
                    padding: 3,
                    children:
                        [{
                            id: 'fontFamily',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['100px'],
                            label: 'font-family',
                            'default': '',
                            items: _fontName,
                            onChange: function (event) {
                                selectOnChange(this, event);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            type: 'hbox',
                            style: 'width:305px;float:left',
                            widths: ['200px', '50px'],
                            children: [{
                                id: 'fontSize',
                                type: 'select',
                                labelLayout: 'horizontal',
                                widths: ['100px'],
                                label: 'font-size',
                                'default': '',
                                items: _fontSize,
                                onKeyDown: function (event) {
                                    selectOnKeyDown(this, event);
                                },
                                onKeyUp: function (event) {
                                    selectOnKeyUp(this, event);
                                },
                                onKeyPress: function (event) {
                                    return selectOnKeyPress(this, event);
                                },
                                onChange: function (event) {
                                    gestUm(this);
                                    selectOnChange(this, event);
                                },
                                setup: function (_style) {
                                    elemSetup(this, _style);
                                }
                            }, {
                                id: 'fontSizeUm',
                                type: 'select',
                                labelLayout: 'horizontal',
                                style: 'width:50px',
                                label: '',
                                'default': 'px',
                                items: _um,
                                onChange: function () {
                                    var dialog = this.getDialog();
                                    var relElement = dialog.getContentElement('page1', this.id.substring(0, this.id.length - 2));
                                    preview(relElement);
                                }
                            }]
                        }, {
                            id: 'fontWeight',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['100px'],
                            label: 'font-weight',
                            'default': '',
                            items: _fontWeight,
                            onChange: function () {
                                preview(this);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            id: 'fontStyle',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['100px'],
                            label: 'font-style',
                            'default': '',
                            items: _fontStyle,
                            onChange: function () {
                                preview(this);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            id: 'fontVariant',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['100px'],
                            label: 'font-variant',
                            'default': '',
                            items: _fontVariant,
                            onChange: function () {
                                preview(this);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['60px', '50px'],
                            children:
                                [
                                    {
                                        type: 'text',
                                        id: 'color',
                                        label: 'color',
                                        labelLayout: 'horizontal',
                                        widths: ['100px'],
                                        'default': '',
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        },
                                        onChange: function () {
                                            preview(this);
                                        }
                                    },
                                    {
                                        type: 'button',
                                        id: 'txcolorChoose',
                                        label: editor.lang.CKCss.choose,
                                        style: 'margin-left: 10px',
                                        onClick: function () {
                                            var self = this;
                                            editor.getColorFromDialog(function(val) {
                                                var destElem = self.getDialog().getContentElement('page1', 'color');
                                                destElem.setValue(val);
                                                preview(destElem);
                                            });
                                        }
                                    }
                                ]
                        }, {
                            id: 'textTransform',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['100px'],
                            label: 'text-transform',
                            'default': '',
                            items: _textTransform,
                            onChange: function () {
                                preview(this);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            id: 'textDecoration',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['100px'],
                            label: 'text-decoration',
                            multiple: true,
                            size: 5,
                            items: _textDecoration,
                            onChange: function () {
                                preview(this);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            type: 'html',
                            style: 'width:95%;',
                            html: CKEDITOR.tools.htmlEncode(editor.lang.CKCss.preview) + '<br><div style="text-align:center;border:1px solid #c0c0c0;background-color:#ffffff;height:50px;overflow:auto"><div  id="' + imagePreviewBoxId + '">AaBbYyGgLlJj</div></div>'
                        }, {
                            id: 'stylePreview',
                            type: 'textarea',
                            style: 'width:100%;',
                            rows: 3

                        }]
                }]
            }, {
                id: 'page2',
                label: editor.lang.CKCss.tabPage2,
                accessKey: 'B',
                elements: [{
                    type: 'vbox',
                    padding: 3,
                    children:
                        [{
                            type: 'hbox',
                            style: 'width:305px;float:left',
                            widths: ['200px', '50px'],
                            children: [{
                                id: 'lineHeight',
                                type: 'select',
                                labelLayout: 'horizontal',
                                widths: ['100px'],
                                label: 'line-height',
                                'default': '',
                                items: _common,
                                onKeyDown: function (event) {
                                    selectOnKeyDown(this, event);
                                },
                                onKeyUp: function (event) {
                                    selectOnKeyUp(this, event);
                                },
                                onKeyPress: function (event) {
                                    return selectOnKeyPress(this, event);
                                },
                                onChange: function (event) {
                                    gestUm(this);
                                    selectOnChange(this, event);
                                },
                                setup: function (_style) {
                                    elemSetup(this, _style);
                                }
                            }, {
                                id: 'lineHeightUm',
                                type: 'select',
                                labelLayout: 'horizontal',
                                style: 'width:50px',
                                label: '',
                                'default': 'px',
                                items: _um,
                                onChange: function () {
                                    var dialog = this.getDialog();
                                    var relElement = dialog.getContentElement('page2', this.id.substring(0, this.id.length - 2));
                                    preview(relElement);
                                }
                            }]
                        }, {
                            type: 'hbox',
                            style: 'width:305px;float:left',
                            widths: ['200px', '50px'],
                            children: [{
                                id: 'verticalAlign',
                                type: 'select',
                                labelLayout: 'horizontal',
                                widths: ['100px'],
                                label: 'vertical-align',
                                'default': '',
                                items: _verticalAlign,
                                onKeyDown: function (event) {
                                    selectOnKeyDown(this, event);
                                },
                                onKeyUp: function (event) {
                                    selectOnKeyUp(this, event);
                                },
                                onKeyPress: function (event) {
                                    return selectOnKeyPress(this, event);
                                },
                                onChange: function (event) {
                                    gestUm(this);
                                    selectOnChange(this, event);
                                },
                                setup: function (_style) {
                                    elemSetup(this, _style);
                                }
                            }, {
                                id: 'verticalAlignUm',
                                type: 'select',
                                labelLayout: 'horizontal',
                                style: 'width:50px',
                                label: '',
                                'default': '%',
                                items: _um,
                                onChange: function () {
                                    var dialog = this.getDialog();
                                    var relElement = dialog.getContentElement('page2', this.id.substring(0, this.id.length - 2));
                                    preview(relElement);
                                }
                            }]
                        }, {
                            id: 'textAlign',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['100px'],
                            label: 'text-align',
                            'default': '',
                            items: _textAlign,
                            onChange: function () {
                                preview(this);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            type: 'hbox',
                            style: 'width:305px;float:left',
                            widths: ['200px', '50px'],
                            children: [{
                                id: 'textIndent',
                                type: 'select',
                                labelLayout: 'horizontal',
                                widths: ['100px'],
                                label: 'text-indent',
                                'default': '',
                                items: _common2,
                                onKeyDown: function (event) {
                                    selectOnKeyDown(this, event);
                                },
                                onKeyUp: function (event) {
                                    selectOnKeyUp(this, event);
                                },
                                onKeyPress: function (event) {
                                    return selectOnKeyPress(this, event);
                                },
                                onChange: function (event) {
                                    gestUm(this);
                                    selectOnChange(this, event);
                                },
                                setup: function (_style) {
                                    elemSetup(this, _style);
                                }
                            }, {
                                id: 'textIndentUm',
                                type: 'select',
                                labelLayout: 'horizontal',
                                style: 'width:50px',
                                label: '',
                                'default': 'px',
                                items: _um,
                                onChange: function () {
                                    var dialog = this.getDialog();
                                    var relElement = dialog.getContentElement('page2', this.id.substring(0, this.id.length - 2));
                                    preview(relElement);
                                }
                            }]
                        }, {
                            id: 'whiteSpace',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['100px'],
                            label: 'white-space',
                            'default': '',
                            items: _whiteSpace,
                            onChange: function () {
                                preview(this);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            type: 'hbox',
                            style: 'width:305px;float:left',
                            widths: ['200px', '50px'],
                            children: [{
                                id: 'wordSpacing',
                                type: 'select',
                                labelLayout: 'horizontal',
                                widths: ['100px'],
                                label: 'word-spacing',
                                'default': '',
                                items: _common,
                                onKeyDown: function (event) {
                                    selectOnKeyDown(this, event);
                                },
                                onKeyUp: function (event) {
                                    selectOnKeyUp(this, event);
                                },
                                onKeyPress: function (event) {
                                    return selectOnKeyPress(this, event);
                                },
                                onChange: function (event) {
                                    gestUm(this);
                                    selectOnChange(this, event);
                                },
                                setup: function (_style) {
                                    elemSetup(this, _style);
                                }
                            }, {
                                id: 'wordSpacingUm',
                                type: 'select',
                                labelLayout: 'horizontal',
                                style: 'width:50px',
                                label: '',
                                'default': 'px',
                                items: _um,
                                onChange: function () {
                                    var dialog = this.getDialog();
                                    var relElement = dialog.getContentElement('page2', this.id.substring(0, this.id.length - 2));
                                    preview(relElement);
                                }
                            }]
                        }, {
                            type: 'hbox',
                            style: 'width:305px;float:left',
                            widths: ['200px', '50px'],
                            children: [{
                                id: 'letterSpacing',
                                type: 'select',
                                labelLayout: 'horizontal',
                                widths: ['100px'],
                                label: 'letter-spacing',
                                'default': '',
                                items: _common2,
                                onKeyDown: function (event) {
                                    selectOnKeyDown(this, event);
                                },
                                onKeyUp: function (event) {
                                    selectOnKeyUp(this, event);
                                },
                                onKeyPress: function (event) {
                                    return selectOnKeyPress(this, event);
                                },
                                onChange: function (event) {
                                    gestUm(this);
                                    selectOnChange(this, event);
                                },
                                setup: function (_style) {
                                    elemSetup(this, _style);
                                }
                            }, {
                                id: 'letterSpacingUm',
                                type: 'select',
                                labelLayout: 'horizontal',
                                style: 'width:50px',
                                label: '',
                                'default': 'px',
                                items: _um,
                                onChange: function () {
                                    var dialog = this.getDialog();
                                    var relElement = dialog.getContentElement('page2', this.id.substring(0, this.id.length - 2));
                                    preview(relElement);
                                }
                            }]
                        }, {
                            type: 'html',
                            style: 'width:95%;',
                            html: CKEDITOR.tools.htmlEncode(editor.lang.CKCss.preview) + '<br><div style="text-align:center;border:1px solid #c0c0c0;background-color:#ffffff;height:50px;overflow:auto"><div  id="' + imagePreviewBoxId + '2">AaBbYyGgLlJj</div></div>'
                        }, {
                            id: 'stylePreview',
                            type: 'textarea',
                            style: 'width:100%;',
                            rows: 3

                        }]
                }]
            }, {
                id: 'page3',
                label: editor.lang.CKCss.tabPage3,
                accessKey: 'S',
                elements: [{
                    type: 'vbox',
                    padding: 3,
                    children:
                        [{
                            type: 'hbox',
                            padding: 0,
                            widths: ['60px', '50px'],
                            children:
                                [
                                    {
                                        type: 'text',
                                        id: 'backgroundColor',
                                        label: 'background-color',
                                        labelLayout: 'horizontal',
                                        widths: ['150px'],
                                        'default': '',
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        },
                                        onChange: function () {
                                            preview(this);
                                        }
                                    },
                                    {
                                        type: 'button',
                                        id: 'bgcolorChoose',
                                        label: editor.lang.CKCss.choose,
                                        style: 'margin-left: 10px',
                                        onClick: function () {
                                            var self = this;
                                            editor.getColorFromDialog(function(val) {
                                                var destElem = self.getDialog().getContentElement('page3', 'backgroundColor');
                                                destElem.setValue(val);
                                                preview(destElem);
                                            });
                                        }
                                    }
                                ]
                        },
                            {
                                type: 'vbox',
                                padding: 0,
                                children:
                                    [
                                        {
                                            type: 'hbox',
                                            widths: ['250px', '110px'],
                                            align: 'right',
                                            children:
                                                [
                                                    {
                                                        id: 'backgroundImage',
                                                        type: 'text',
                                                        widths: ['150px'],
                                                        labelLayout: 'horizontal',
                                                        label: 'background-image',
                                                        onChange: function () {
                                                            //this.setValue('url(\'' + this.getValue() + '\')');
                                                            preview(this);
                                                        },
                                                        setup: function (_style) {
                                                            elemSetup(this, _style);
                                                        }
                                                    },
                                                    {
                                                        type: 'button',
                                                        id: 'browse',
                                                        // v-align with the 'txtUrl' field.
                                                        // TODO: We need something better than a fixed size here.
                                                        align: 'center',
                                                        label: editor.lang.common.browseServer,
                                                        hidden: true,
                                                        filebrowser :
                                                        {
                                                            action : 'Browse',
                                                            target:  'page3:backgroundImage',
                                                            url: editor.config.filebrowserImageBrowseLinkUrl,
                                                            params : //optional
                                                            {
                                                                type : 'Images',
                                                                currentFolder : '/'
                                                            }
                                                        }
                                                    }
                                                ]
                                        }
                                    ]
                            }, {
                            id: 'backgroundRepeat',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['150px'],
                            label: 'background-repeat',
                            'default': '',
                            items: _backgroundRepeat,
                            onChange: function () {
                                preview(this);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            id: 'backgroundAttachment',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['150px'],
                            label: 'background-attachment',
                            'default': '',
                            items: _backgroundAttachment,
                            onChange: function () {
                                preview(this);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            type: 'hbox',
                            style: 'width:355px;float:left',
                            widths: ['200px', '50px'],
                            children: [{
                                id: 'backgroundPositionX',
                                type: 'select',
                                labelLayout: 'horizontal',
                                widths: ['150px'],
                                label: 'background-position-x',
                                'default': '',
                                items: _backgroundPositionX,
                                onKeyDown: function (event) {
                                    selectOnKeyDown(this, event);
                                },
                                onKeyUp: function (event) {
                                    selectOnKeyUp(this, event);
                                },
                                onKeyPress: function (event) {
                                    return selectOnKeyPress(this, event);
                                },
                                onChange: function (event) {
                                    gestUm(this);
                                    selectOnChange(this, event);
                                },
                                setup: function (_style) {
                                    elemSetup(this, _style);
                                }
                            }, {
                                id: 'backgroundPositionXUm',
                                type: 'select',
                                labelLayout: 'horizontal',
                                style: 'width:50px',
                                label: '',
                                'default': 'px',
                                items: _um,
                                onChange: function () {
                                    var dialog = this.getDialog();
                                    var relElement = dialog.getContentElement('page3', this.id.substring(0, this.id.length - 2));
                                    preview(relElement);
                                }
                            }]
                        }, {
                            type: 'hbox',
                            style: 'width:355px;float:left',
                            widths: ['200px', '50px'],
                            children: [{
                                id: 'backgroundPositionY',
                                type: 'select',
                                labelLayout: 'horizontal',
                                widths: ['150px'],
                                label: 'background-position-y',
                                'default': '',
                                items: _backgroundPositionY,
                                onKeyDown: function (event) {
                                    selectOnKeyDown(this, event);
                                },
                                onKeyUp: function (event) {
                                    selectOnKeyUp(this, event);
                                },
                                onKeyPress: function (event) {
                                    return selectOnKeyPress(this, event);
                                },
                                onChange: function (event) {
                                    gestUm(this);
                                    selectOnChange(this, event);
                                },
                                setup: function (_style) {
                                    elemSetup(this, _style);
                                }
                            }, {
                                id: 'backgroundPositionYUm',
                                type: 'select',
                                labelLayout: 'horizontal',
                                style: 'width:50px',
                                label: '',
                                'default': 'px',
                                items: _um,
                                onChange: function () {
                                    var dialog = this.getDialog();
                                    var relElement = dialog.getContentElement('page3', this.id.substring(0, this.id.length - 2));
                                    preview(relElement);
                                }
                            }]
                        }, {
                            type: 'html',
                            style: 'width:95%;',
                            html: CKEDITOR.tools.htmlEncode(editor.lang.CKCss.preview) + '<br><div style="text-align:center;border:1px solid #c0c0c0;background-color:#ffffff;height:50px;overflow:auto"><div  id="' + imagePreviewBoxId + '3">AaBbYyGgLlJj</div></div>'
                        }, {
                            id: 'stylePreview',
                            type: 'textarea',
                            style: 'width:100%;',
                            rows: 3

                        }]
                }]
            }, {
                id: 'page4',
                label: editor.lang.CKCss.tabPage4,
                accessKey: 'S',
                elements: [{
                    type: 'vbox',
                    padding: 3,
                    children:
                        [{
                            type: 'hbox',
                            padding: 0,
                            widths: ['60px', '122px', '182px', '182px'],
                            children:
                                [{
                                    type: 'html',
                                    html: '&nbsp;'
                                }, {
                                    type: 'html',
                                    style: 'text-align:center',
                                    html: 'border-style'
                                }, {
                                    type: 'html',
                                    style: 'text-align:center',
                                    html: 'border-width'
                                }, {
                                    type: 'html',
                                    style: 'text-align:center',
                                    html: 'border-color'
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['60px', '122px', '182px', '182px'],
                            children:
                                [{
                                    type: 'html',
                                    html: '&nbsp;'
                                }, {
                                    type: 'checkbox',
                                    id: 'borderStyleAll',
                                    label: editor.lang.CKCss.sameForAll,
                                    style: 'text-align:center',
                                    labelLayout: 'right',
                                    setup: function () {
                                        this.setValue(true);
                                    },
                                    onChange: function () {
                                        setAll(this, 'border', 'Style', 'page4');

                                    }
                                }, {
                                    type: 'checkbox',
                                    id: 'borderWidthAll',
                                    label: editor.lang.CKCss.sameForAll,
                                    style: 'text-align:center',
                                    labelLayout: 'right',
                                    checked: true,
                                    setup: function () {
                                        this.setValue(true);
                                    },
                                    onChange: function () {
                                        setAll(this, 'border', 'Width', 'page4');
                                        setAll(this, 'border', 'WidthUm', 'page4');
                                    }
                                }, {
                                    type: 'checkbox',
                                    id: 'borderColorAll',
                                    label: editor.lang.CKCss.sameForAll,
                                    labelLayout: 'right',
                                    style: 'text-align:center',
                                    checked: true,
                                    setup: function () {
                                        this.setValue(true);
                                    },
                                    onChange: function () {
                                        setAll(this, 'border', 'Color', 'page4')
                                    }
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['182px', '182px', '182px'],
                            children:
                                [{
                                    id: 'borderTopStyle',
                                    type: 'select',
                                    labelLayout: 'horizontal',
                                    widths: ['60px'],
                                    label: 'Top:',
                                    'default': '',
                                    items: _borderStyle,
                                    onChange: function () {
                                        preview(this);
                                        var dialog = this.getDialog();
                                        var elem = dialog.getContentElement('page4', 'borderStyleAll');
                                        if (elem.getValue()) elem.setValue(true);
                                    },
                                    setup: function (_style) {
                                        elemSetup(this, _style);
                                    }
                                }, {
                                    type: 'hbox',
                                    style: 'width:150px;float:left',
                                    widths: ['80px', '45px'],
                                    children: [{
                                        id: 'borderTopWidth',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['0px'],
                                        label: '',
                                        'default': '',
                                        items: _borderWidth,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                            selectOnKeyDownAll(this, 'border', 'Width', 'page4', event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                            selectOnKeyUpAll(this, 'border', 'Width', 'page4', event);
                                        },
                                        onKeyPress: function (event) {
                                            var rtn = selectOnKeyPress(this, event);
                                            selectOnKeyPressAll(this, 'border', 'Width', 'page4', event);
                                            return rtn;
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                            var dialog = this.getDialog();
                                            var elem = dialog.getContentElement('page4', 'borderWidthAll');
                                            if (elem.getValue()) elem.setValue(true);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    }, {
                                        id: 'borderTopWidthUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var elem = dialog.getContentElement('page4', 'borderWidthAll');
                                            if (elem.getValue()) elem.setValue(true);
                                            var relElement = dialog.getContentElement('page4', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }, {
                                    type: 'hbox',
                                    padding: 0,
                                    widths: ['60px', '50px'],
                                    children:
                                        [
                                            {
                                                type: 'text',
                                                id: 'borderTopColor',
                                                label: '',
                                                labelLayout: '',
                                                widths: ['0px'],
                                                'default': '',
                                                setup: function (_style) {
                                                    elemSetup(this, _style);
                                                },
                                                onChange: function () {
                                                    preview(this);
                                                    var dialog = this.getDialog();
                                                    var elem = dialog.getContentElement('page4', 'borderColorAll');
                                                    if (elem.getValue()) elem.setValue(true);
                                                }
                                            },
                                            {
                                                type: 'button',
                                                id: 'btcolorChoose',
                                                label: editor.lang.CKCss.choose,
                                                style: 'margin-left: 10px',
                                                onClick: function () {
                                                    var self = this;
                                                    editor.getColorFromDialog(function(val) {
                                                        var destElem = self.getDialog().getContentElement('page4', 'borderTopColor');
                                                        destElem.setValue(val);
                                                        preview(destElem);
                                                        var dialog = destElem.getDialog();
                                                        var elem = dialog.getContentElement('page4', 'borderColorAll');
                                                        if (elem.getValue()) elem.setValue(true);
                                                    });
                                                }
                                            }
                                        ]
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['182px', '182px', '182px'],
                            children:
                                [{
                                    id: 'borderRightStyle',
                                    type: 'select',
                                    labelLayout: 'horizontal',
                                    widths: ['60px'],
                                    label: 'Right:',
                                    'default': '',
                                    items: _borderStyle,
                                    onChange: function () {
                                        preview(this);
                                    },
                                    setup: function (_style) {
                                        elemSetup(this, _style);
                                    }
                                }, {
                                    type: 'hbox',
                                    style: 'width:150px;float:left',
                                    widths: ['80px', '45px'],
                                    children: [{
                                        id: 'borderRightWidth',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['0px'],
                                        label: '',
                                        'default': '',
                                        items: _borderWidth,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    }, {
                                        id: 'borderRightWidthUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page4', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }, {
                                    type: 'hbox',
                                    padding: 0,
                                    widths: ['60px', '50px'],
                                    children:
                                        [
                                            {
                                                type: 'text',
                                                id: 'borderRightColor',
                                                label: '',
                                                labelLayout: '',
                                                widths: ['0px'],
                                                'default': '',
                                                setup: function (_style) {
                                                    elemSetup(this, _style);
                                                },
                                                onChange: function () {
                                                    preview(this);
                                                }
                                            },
                                            {
                                                type: 'button',
                                                id: 'brcolorChoose',
                                                label: editor.lang.CKCss.choose,
                                                style: 'margin-left: 10px',
                                                onClick: function () {
                                                    var self = this;
                                                    editor.getColorFromDialog(function(val) {
                                                        var destElem = self.getDialog().getContentElement('page4', 'borderRightColor');
                                                        destElem.setValue(val);
                                                        preview(destElem);
                                                    });
                                                }
                                            }
                                        ]
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['182px', '182px', '182px'],
                            children:
                                [{
                                    id: 'borderBottomStyle',
                                    type: 'select',
                                    labelLayout: 'horizontal',
                                    widths: ['60px'],
                                    label: 'Bottom:',
                                    'default': '',
                                    items: _borderStyle,
                                    onChange: function () {
                                        preview(this);
                                    },
                                    setup: function (_style) {
                                        elemSetup(this, _style);
                                    }
                                }, {
                                    type: 'hbox',
                                    style: 'width:150px;float:left',
                                    widths: ['80px', '45px'],
                                    children: [{
                                        id: 'borderBottomWidth',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['0px'],
                                        label: '',
                                        'default': '',
                                        items: _borderWidth,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    }, {
                                        id: 'borderBottomWidthUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page4', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }, {
                                    type: 'hbox',
                                    padding: 0,
                                    widths: ['60px', '50px'],
                                    children:
                                        [
                                            {
                                                type: 'text',
                                                id: 'borderBottomColor',
                                                label: '',
                                                labelLayout: '',
                                                widths: ['0px'],
                                                'default': '',
                                                setup: function (_style) {
                                                    elemSetup(this, _style);
                                                },
                                                onChange: function () {
                                                    preview(this);
                                                }
                                            },
                                            {
                                                type: 'button',
                                                id: 'bbcolorChoose',
                                                label: editor.lang.CKCss.choose,
                                                style: 'margin-left: 10px',
                                                onClick: function () {
                                                    var self = this;
                                                    editor.getColorFromDialog(function(val) {
                                                        var destElem = self.getDialog().getContentElement('page4', 'borderBottomColor');
                                                        destElem.setValue(val);
                                                        preview(destElem);
                                                    });
                                                }
                                            }
                                        ]
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['182px', '182px', '182px'],
                            children:
                                [{
                                    id: 'borderLeftStyle',
                                    type: 'select',
                                    labelLayout: 'horizontal',
                                    widths: ['60px'],
                                    label: 'Left:',
                                    'default': '',
                                    items: _borderStyle,
                                    onChange: function () {
                                        preview(this);
                                    },
                                    setup: function (_style) {
                                        elemSetup(this, _style);
                                    }
                                }, {
                                    type: 'hbox',
                                    style: 'width:150px;float:left',
                                    widths: ['80px', '45px'],
                                    children: [{
                                        id: 'borderLeftWidth',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['0px'],
                                        label: '',
                                        'default': '',
                                        items: _borderWidth,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    }, {
                                        id: 'borderLeftWidthUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page4', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }, {
                                    type: 'hbox',
                                    padding: 0,
                                    widths: ['60px', '50px'],
                                    children:
                                        [
                                            {
                                                type: 'text',
                                                id: 'borderLeftColor',
                                                label: '',
                                                labelLayout: '',
                                                widths: ['0px'],
                                                'default': '',
                                                setup: function (_style) {
                                                    elemSetup(this, _style);
                                                },
                                                onChange: function () {
                                                    preview(this);
                                                }
                                            },
                                            {
                                                type: 'button',
                                                id: 'blcolorChoose',
                                                label: editor.lang.CKCss.choose,
                                                style: 'margin-left: 10px',
                                                onClick: function () {
                                                    var self = this;
                                                    editor.getColorFromDialog(function(val) {
                                                        var destElem = self.getDialog().getContentElement('page4', 'borderLeftColor');
                                                        destElem.setValue(val);
                                                        preview(destElem);
                                                    });
                                                }
                                            }
                                        ]
                                }]
                        }, {
                            type: 'html',
                            style: 'width:95%;',
                            html: CKEDITOR.tools.htmlEncode(editor.lang.CKCss.preview) + '<br><div style="text-align:center;border:1px solid #c0c0c0;background-color:#ffffff;height:50px;overflow:auto"><div id="' + imagePreviewBoxId + '4">AaBbYyGgLlJj</div></div>'
                        }, {
                            id: 'stylePreview',
                            type: 'textarea',
                            style: 'width:100%;',
                            rows: 3

                        }]
                }]

            }, {
                id: 'page5',
                label: editor.lang.CKCss.tabPage5,
                accessKey: 'S',
                elements: [{
                    type: 'vbox',
                    padding: 3,
                    children:
                        [{
                            type: 'hbox',
                            padding: 0,
                            widths: ['60px', '213px', '60px', '213px'],
                            children:
                                [{
                                    type: 'html',
                                    style: 'text-align:center',
                                    html: 'padding'
                                }, {
                                    type: 'checkbox',
                                    id: 'paddingAll',
                                    label: editor.lang.CKCss.sameForAll,
                                    style: 'text-align:center',
                                    labelLayout: 'Right:',
                                    setup: function () {
                                        this.setValue(true);
                                    },
                                    onChange: function () {
                                        setAll(this, 'padding', '', 'page5')
                                        setAll(this, 'padding', 'Um', 'page5');
                                    }
                                }, {
                                    type: 'html',
                                    style: 'text-align:center',
                                    html: 'margin'
                                }, {
                                    type: 'checkbox',
                                    id: 'marginAll',
                                    label: editor.lang.CKCss.sameForAll,
                                    style: 'text-align:center',
                                    labelLayout: 'right',
                                    checked: true,
                                    setup: function () {
                                        this.setValue(true);
                                    },
                                    onChange: function () {
                                        setAll(this, 'margin', '', 'page5')
                                        setAll(this, 'margin', 'Um', 'page5');
                                    }
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['60px', '213px', '60px', '213px'],
                            children:
                                [{
                                    type: 'html',
                                    style: 'text-align:center',
                                    html: 'Top:'
                                },

                                    {
                                        type: 'hbox',
                                        style: 'width:150px;float:left',
                                        widths: ['80px', '45px'],
                                        children: [{
                                            id: 'paddingTop',
                                            type: 'select',
                                            labelLayout: 'horizontal',
                                            widths: ['0px'],
                                            label: '',
                                            'default': '',
                                            items: _common2,
                                            onKeyDown: function (event) {
                                                selectOnKeyDown(this, event);
                                                selectOnKeyDownAll(this, 'padding', '', 'page5', event);
                                            },
                                            onKeyUp: function (event) {
                                                selectOnKeyUp(this, event);
                                                selectOnKeyUpAll(this, 'padding', '', 'page5', event);
                                            },
                                            onKeyPress: function (event) {
                                                var rtn = selectOnKeyPress(this, event);
                                                selectOnKeyPressAll(this, 'padding', '', 'page5', event);
                                                return rtn;
                                            },
                                            onChange: function (event) {
                                                gestUm(this);
                                                selectOnChange(this, event);
                                                var dialog = this.getDialog();
                                                var elem = dialog.getContentElement('page5', 'paddingAll');
                                                if (elem.getValue()) elem.setValue(true);
                                            },
                                            setup: function (_style) {
                                                elemSetup(this, _style);
                                            }
                                        }, {
                                            id: 'paddingTopUm',
                                            type: 'select',
                                            labelLayout: 'horizontal',
                                            style: 'width:45px',
                                            label: '',
                                            'default': 'px',
                                            items: _um,
                                            onChange: function () {
                                                var dialog = this.getDialog();
                                                var elem = dialog.getContentElement('page5', 'paddingAll');
                                                if (elem.getValue()) elem.setValue(true);
                                                var relElement = dialog.getContentElement('page5', this.id.substring(0, this.id.length - 2));
                                                preview(relElement);
                                            }
                                        }]
                                    },
                                    {
                                        type: 'html',
                                        style: 'text-align:center',
                                        html: 'Top:'
                                    }, {
                                    type: 'hbox',
                                    style: 'width:150px;float:left',
                                    widths: ['80px', '45px'],
                                    children: [{
                                        id: 'marginTop',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['0px'],
                                        label: '',
                                        'default': '',
                                        items: _common2,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                            selectOnKeyDownAll(this, 'margin', '', 'page5', event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                            selectOnKeyUpAll(this, 'margin', '', 'page5', event);
                                        },
                                        onKeyPress: function (event) {
                                            var rtn = selectOnKeyPress(this, event);
                                            selectOnKeyPressAll(this, 'margin', '', 'page5', event);
                                            return rtn;
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                            var dialog = this.getDialog();
                                            var elem = dialog.getContentElement('page5', 'marginAll');
                                            if (elem.getValue()) elem.setValue(true);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    }, {
                                        id: 'marginTopUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var elem = dialog.getContentElement('page5', 'marginAll');
                                            if (elem.getValue()) elem.setValue(true);
                                            var relElement = dialog.getContentElement('page5', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['60px', '213px', '60px', '213px'],
                            children:
                                [{
                                    type: 'html',
                                    style: 'text-align:center',
                                    html: 'right'
                                },

                                    {
                                        type: 'hbox',
                                        style: 'width:150px;float:left',
                                        widths: ['80px', '45px'],
                                        children: [{
                                            id: 'paddingRight',
                                            type: 'select',
                                            labelLayout: 'horizontal',
                                            widths: ['0px'],
                                            label: '',
                                            'default': '',
                                            items: _common2,
                                            onKeyDown: function (event) {
                                                selectOnKeyDown(this, event);
                                            },
                                            onKeyUp: function (event) {
                                                selectOnKeyUp(this, event);
                                            },
                                            onKeyPress: function (event) {
                                                return selectOnKeyPress(this, event);
                                            },
                                            onChange: function (event) {
                                                gestUm(this);
                                                selectOnChange(this, event);
                                            },
                                            setup: function (_style) {
                                                elemSetup(this, _style);
                                            }
                                        }, {
                                            id: 'paddingRightUm',
                                            type: 'select',
                                            labelLayout: 'horizontal',
                                            style: 'width:45px',
                                            label: '',
                                            'default': 'px',
                                            items: _um,
                                            onChange: function () {
                                                var dialog = this.getDialog();
                                                var relElement = dialog.getContentElement('page5', this.id.substring(0, this.id.length - 2));
                                                preview(relElement);
                                            }
                                        }]
                                    },
                                    {
                                        type: 'html',
                                        style: 'text-align:center',
                                        html: 'right'
                                    }, {
                                    type: 'hbox',
                                    style: 'width:150px;float:left',
                                    widths: ['80px', '45px'],
                                    children: [{
                                        id: 'marginRight',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['0px'],
                                        label: '',
                                        'default': '',
                                        items: _common2,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    }, {
                                        id: 'marginRightUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page5', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['60px', '213px', '60px', '213px'],
                            children:
                                [{
                                    type: 'html',
                                    style: 'text-align:center',
                                    html: 'Bottom:'
                                },

                                    {
                                        type: 'hbox',
                                        style: 'width:150px;float:left',
                                        widths: ['80px', '45px'],
                                        children: [{
                                            id: 'paddingBottom',
                                            type: 'select',
                                            labelLayout: 'horizontal',
                                            widths: ['0px'],
                                            label: '',
                                            'default': '',
                                            items: _common2,
                                            onKeyDown: function (event) {
                                                selectOnKeyDown(this, event);
                                            },
                                            onKeyUp: function (event) {
                                                selectOnKeyUp(this, event);
                                            },
                                            onKeyPress: function (event) {
                                                return selectOnKeyPress(this, event);
                                            },
                                            onChange: function (event) {
                                                gestUm(this);
                                                selectOnChange(this, event);
                                            },
                                            setup: function (_style) {
                                                elemSetup(this, _style);
                                            }
                                        }, {
                                            id: 'paddingBottomUm',
                                            type: 'select',
                                            labelLayout: 'horizontal',
                                            style: 'width:45px',
                                            label: '',
                                            'default': 'px',
                                            items: _um,
                                            onChange: function () {
                                                var dialog = this.getDialog();
                                                var relElement = dialog.getContentElement('page5', this.id.substring(0, this.id.length - 2));
                                                preview(relElement);
                                            }
                                        }]
                                    },
                                    {
                                        type: 'html',
                                        style: 'text-align:center',
                                        html: 'Bottom:'
                                    }, {
                                    type: 'hbox',
                                    style: 'width:150px;float:left',
                                    widths: ['80px', '45px'],
                                    children: [{
                                        id: 'marginBottom',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['0px'],
                                        label: '',
                                        'default': '',
                                        items: _common2,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    }, {
                                        id: 'marginBottomUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page5', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['60px', '213px', '60px', '213px'],
                            children:
                                [{
                                    type: 'html',
                                    style: 'text-align:center',
                                    html: 'Left:'
                                },

                                    {
                                        type: 'hbox',
                                        style: 'width:150px;float:left',
                                        widths: ['80px', '45px'],
                                        children: [{
                                            id: 'paddingLeft',
                                            type: 'select',
                                            labelLayout: 'horizontal',
                                            widths: ['0px'],
                                            label: '',
                                            'default': '',
                                            items: _common2,
                                            onKeyDown: function (event) {
                                                selectOnKeyDown(this, event);
                                            },
                                            onKeyUp: function (event) {
                                                selectOnKeyUp(this, event);
                                            },
                                            onKeyPress: function (event) {
                                                return selectOnKeyPress(this, event);
                                            },
                                            onChange: function (event) {
                                                gestUm(this);
                                                selectOnChange(this, event);
                                            },
                                            setup: function (_style) {
                                                elemSetup(this, _style);
                                            }
                                        }, {
                                            id: 'paddingLeftUm',
                                            type: 'select',
                                            labelLayout: 'horizontal',
                                            style: 'width:45px',
                                            label: '',
                                            'default': 'px',
                                            items: _um,
                                            onChange: function () {
                                                var dialog = this.getDialog();
                                                var relElement = dialog.getContentElement('page5', this.id.substring(0, this.id.length - 2));
                                                preview(relElement);
                                            }
                                        }]
                                    },
                                    {
                                        type: 'html',
                                        style: 'text-align:center',
                                        html: 'Left:'
                                    }, {
                                    type: 'hbox',
                                    style: 'width:150px;float:left',
                                    widths: ['80px', '45px'],
                                    children: [{
                                        id: 'marginLeft',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['0px'],
                                        label: '',
                                        'default': '',
                                        items: _common2,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    }, {
                                        id: 'marginLeftUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page5', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }]
                        }, {
                            type: 'html',
                            style: 'width:95%;',
                            html: CKEDITOR.tools.htmlEncode(editor.lang.CKCss.preview) + '<br><div style="text-align:center;border:1px solid #c0c0c0;background-color:#ffffff;height:50px;overflow:auto"><div id="' + imagePreviewBoxId + '5">AaBbYyGgLlJj</div></div>'
                        }, {
                            id: 'stylePreview',
                            type: 'textarea',
                            style: 'width:100%;',
                            rows: 3

                        }]
                }]

            }, {
                id: 'page6',
                label: editor.lang.CKCss.tabPage6,
                accessKey: 'S',
                elements: [{
                    type: 'vbox',
                    padding: 3,
                    children:
                        [{
                            type: 'hbox',
                            padding: 0,
                            widths: ['273px', '273px'],
                            children:
                                [{
                                    id: 'position',
                                    type: 'select',
                                    labelLayout: 'horizontal',
                                    widths: ['80px'],
                                    label: 'position',
                                    'default': '',
                                    items: _position,
                                    onChange: function () {
                                        preview(this);
                                    },
                                    setup: function (_style) {
                                        elemSetup(this, _style);
                                    }
                                }, {
                                    type: 'hbox',
                                    style: 'width:273px;float:left',
                                    widths: ['160px', '45px'],
                                    children: [{
                                        id: 'width',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['80px'],
                                        label: 'width',
                                        'default': '',
                                        items: _common3,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    }, {
                                        id: 'widthUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page6', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['273px', '273px'],
                            children:
                                [{
                                    id: 'zIndex',
                                    type: 'select',
                                    labelLayout: 'horizontal',
                                    widths: ['80px'],
                                    label: 'z-index',
                                    'default': '',
                                    items: _common3,
                                    onChange: function () {
                                        preview(this);
                                    },
                                    setup: function (_style) {
                                        elemSetup(this, _style);
                                    }
                                }, {
                                    type: 'hbox',
                                    style: 'width:273px;float:left',
                                    widths: ['160px', '45px'],
                                    children: [{
                                        id: 'height',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['80px'],
                                        label: 'height',
                                        'default': '',
                                        items: _common3,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    }, {
                                        id: 'heightUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page6', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['273px', '273px'],
                            children:
                                [{
                                    type: 'html',
                                    html: '&nbsp;'
                                }, {
                                    type: 'hbox',
                                    style: 'width:273px;float:left',
                                    widths: ['160px', '45px'],
                                    children: [{
                                        id: 'top',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['80px'],
                                        label: 'top',
                                        'default': '',
                                        items: _common3,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    }, {
                                        id: 'topUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page6', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['273px', '273px'],
                            children:
                                [{
                                    type: 'html',
                                    html: '&nbsp;'
                                }, {
                                    type: 'hbox',
                                    style: 'width:273px;float:left',
                                    widths: ['160px', '45px'],
                                    children: [{
                                        id: 'right',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['80px'],
                                        label: 'right',
                                        'default': '',
                                        items: _common3,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    }, {
                                        id: 'rightUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page6', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['273px', '273px'],
                            children:
                                [{
                                    type: 'html',
                                    html: '&nbsp;'
                                }, {
                                    type: 'hbox',
                                    style: 'width:273px;float:left',
                                    widths: ['160px', '45px'],
                                    children: [{
                                        id: 'bottom',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['80px'],
                                        label: 'bottom',
                                        'default': '',
                                        items: _common3,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    }, {
                                        id: 'bottomUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page6', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['273px', '273px'],
                            children:
                                [{
                                    type: 'html',
                                    html: '&nbsp;'
                                }, {
                                    type: 'hbox',
                                    style: 'width:273px;float:left',
                                    widths: ['160px', '45px'],
                                    children: [{
                                        id: 'left',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['80px'],
                                        label: 'left',
                                        'default': '',
                                        items: _common3,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    }, {
                                        id: 'leftUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page6', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }]
                        }, {
                            type: 'html',
                            style: 'width:95%;',
                            html: CKEDITOR.tools.htmlEncode(editor.lang.common.preview) + '<br><div style="text-align:center;border:1px solid #c0c0c0;background-color:#ffffff;height:50px;overflow:auto"><div  id="' + imagePreviewBoxId + '6">AaBbYyGgLlJj</div></div>'
                        }, {
                            id: 'stylePreview',
                            type: 'textarea',
                            style: 'width:100%;',
                            rows: 3

                        }]
                }]

            }, {
                id: 'page7',
                label: editor.lang.CKCss.tabPage7,
                accessKey: 'S',
                elements: [{
                    type: 'vbox',
                    padding: 3,
                    children:
                        [{
                            type: 'hbox',
                            padding: 0,
                            widths: ['273px', '273px'],
                            children:
                                [{
                                    id: 'visibility',
                                    type: 'select',
                                    labelLayout: 'horizontal',
                                    widths: ['80px'],
                                    label: 'visibility',
                                    'default': '',
                                    items: _visibility,
                                    onChange: function () {
                                        preview(this);
                                    },
                                    setup: function (_style) {
                                        elemSetup(this, _style);
                                    }
                                }, {

                                    id: 'overflow',
                                    type: 'select',
                                    labelLayout: 'horizontal',
                                    widths: ['80px'],
                                    label: 'overflow',
                                    'default': '',
                                    items: _overflow,
                                    onChange: function () {
                                        preview(this);
                                    },
                                    setup: function (_style) {
                                        elemSetup(this, _style);
                                    }
                                }]

                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['273px', '273px'],
                            children:
                                [{
                                    id: 'display',
                                    type: 'select',
                                    labelLayout: 'horizontal',
                                    widths: ['80px'],
                                    label: 'display',
                                    'default': '',
                                    items: _display,
                                    onChange: function () {
                                        preview(this);
                                    },
                                    setup: function (_style) {
                                        elemSetup(this, _style);
                                    }
                                }, {
                                    type: 'html',
                                    html: 'clip:rect(...)'
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['273px', '273px'],
                            children:
                                [{
                                    id: 'styleFloat',
                                    type: 'select',
                                    labelLayout: 'horizontal',
                                    widths: ['80px'],
                                    label: 'float',
                                    'default': '',
                                    items: _float,
                                    onChange: function () {
                                        preview(this);
                                    },
                                    setup: function (_style) {
                                        elemSetup(this, _style);
                                    }
                                }, {
                                    type: 'hbox',
                                    style: 'width:273px;float:left',
                                    widths: ['160px', '45px'],
                                    children: [{
                                        id: 'clipTop',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['80px'],
                                        label: 'top',
                                        'default': '',
                                        items: _common3,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    }, {
                                        id: 'clipTopUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page7', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['273px', '273px'],
                            children:
                                [{
                                    id: 'clear',
                                    type: 'select',
                                    labelLayout: 'horizontal',
                                    widths: ['80px'],
                                    label: 'clear',
                                    'default': '',
                                    items: _clear,
                                    onChange: function () {
                                        preview(this);
                                    },
                                    setup: function (_style) {
                                        elemSetup(this, _style);
                                    }
                                }, {
                                    type: 'hbox',
                                    style: 'width:273px;float:left',
                                    widths: ['160px', '45px'],
                                    children: [{
                                        id: 'clipRight',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['80px'],
                                        label: 'right',
                                        'default': '',
                                        items: _common3,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        }
                                    }, {
                                        id: 'clipRightUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page7', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['273px', '273px'],
                            children:
                                [{
                                    id: 'cursor',
                                    type: 'select',
                                    labelLayout: 'horizontal',
                                    widths: ['80px'],
                                    label: 'cursor',
                                    'default': '',
                                    items: _cursor,
                                    onChange: function () {
                                        preview(this);
                                    },
                                    setup: function (_style) {
                                        elemSetup(this, _style);
                                    }
                                }, {
                                    type: 'hbox',
                                    style: 'width:273px;float:left',
                                    widths: ['160px', '45px'],
                                    children: [{
                                        id: 'clipBottom',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['80px'],
                                        label: 'bottom',
                                        'default': '',
                                        items: _common3,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        }
                                    }, {
                                        id: 'clipBottomUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page7', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }]
                        }, {
                            type: 'hbox',
                            padding: 0,
                            widths: ['273px', '273px'],
                            children:
                                [{
                                    type: 'html',
                                    html: '&nbsp;'
                                }, {
                                    type: 'hbox',
                                    style: 'width:273px;float:left',
                                    widths: ['160px', '45px'],
                                    children: [{
                                        id: 'clipLeft',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        widths: ['80px'],
                                        label: 'left',
                                        'default': '',
                                        items: _common3,
                                        onKeyDown: function (event) {
                                            selectOnKeyDown(this, event);
                                        },
                                        onKeyUp: function (event) {
                                            selectOnKeyUp(this, event);
                                        },
                                        onKeyPress: function (event) {
                                            return selectOnKeyPress(this, event);
                                        },
                                        onChange: function (event) {
                                            gestUm(this);
                                            selectOnChange(this, event);
                                        }
                                    }, {
                                        id: 'clipLeftUm',
                                        type: 'select',
                                        labelLayout: 'horizontal',
                                        style: 'width:45px',
                                        label: '',
                                        'default': 'px',
                                        items: _um,
                                        onChange: function () {
                                            var dialog = this.getDialog();
                                            var relElement = dialog.getContentElement('page7', this.id.substring(0, this.id.length - 2));
                                            preview(relElement);
                                        }
                                    }]
                                }]
                        }, {
                            type: 'html',
                            style: 'width:95%;',
                            html: CKEDITOR.tools.htmlEncode(editor.lang.common.preview) + '<br><div style="text-align:center;border:1px solid #c0c0c0;background-color:#ffffff;height:50px;overflow:auto"><div  id="' + imagePreviewBoxId + '7">AaBbYyGgLlJj</div></div>'
                        }, {
                            id: 'stylePreview',
                            type: 'textarea',
                            style: 'width:100%;',
                            rows: 3

                        }]
                }]

            }, {
                id: 'page8',
                label: editor.lang.CKCss.tabPage8,
                accessKey: 'S',
                elements: [{
                    type: 'vbox',
                    padding: 3,
                    children:
                        [{
                            id: 'listStyleType',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['150px'],
                            label: 'list-style-type',
                            'default': '',
                            items: _listStyleType,
                            onChange: function () {
                                preview(this);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            type: 'hbox',
                            widths: ['250px', '110px'],
                            align: 'right',
                            children:
                                [
                                    {
                                        id: 'listStyleImage',
                                        type: 'text',
                                        widths: ['150px'],
                                        labelLayout: 'horizontal',
                                        label: 'list-style-image',
                                        onChange: function () {
                                            //this.setValue('url(\'' + this.getValue() + '\')');
                                            preview(this);
                                        },
                                        setup: function (_style) {
                                            elemSetup(this, _style);
                                        }
                                    },
                                    {
                                        type: 'button',
                                        id: 'browse',
                                        // v-align with the 'txtUrl' field.
                                        // TODO: We need something better than a fixed size here.
                                        align: 'center',
                                        label: editor.lang.common.browseServer,
                                        hidden: true,
                                        filebrowser :
                                        {
                                            action : 'Browse',
                                            target:  'page8:listStyleImage',
                                            url: editor.config.filebrowserImageBrowseLinkUrl,
                                            params : //optional
                                            {
                                                type : 'Images',
                                                currentFolder : '/'
                                            }
                                        }
                                    }
                                ]
                        }, {
                            id: 'listStylePosition',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['150px'],
                            label: 'list-style-position',
                            'default': '',
                            items: _listStylePosition,
                            onChange: function () {
                                preview(this);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            type: 'html',
                            style: 'width:95%;',
                            html: CKEDITOR.tools.htmlEncode(editor.lang.common.preview) + '<br><div style="text-align:center;border:1px solid #c0c0c0;background-color:#ffffff;height:50px;overflow:auto"><div  id="' + imagePreviewBoxId + '8">AaBbYyGgLlJj</div></div>'
                        }, {
                            id: 'stylePreview',
                            type: 'textarea',
                            style: 'width:100%;',
                            rows: 3

                        }]
                }]

            }, {
                id: 'page9',
                label: editor.lang.CKCss.tabPage9,
                accessKey: 'S',
                elements: [{
                    type: 'vbox',
                    padding: 3,
                    children:
                        [{
                            id: 'tableLayout',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['150px'],
                            label: 'table-layout',
                            'default': '',
                            items: _tableLayout,
                            onChange: function () {
                                preview(this);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            id: 'borderCollapse',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['150px'],
                            label: 'borderCollapse',
                            'default': '',
                            items: _borderCollapse,
                            onChange: function () {
                                preview(this);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            type: 'hbox',
                            style: 'width:273px;float:left',
                            widths: ['160px', '45px'],
                            children: [{
                                id: 'borderSpacing',
                                type: 'select',
                                labelLayout: 'horizontal',
                                widths: ['150px'],
                                label: 'border-spacing',
                                'default': '',
                                items: _common2,
                                onKeyDown: function (event) {
                                    selectOnKeyDown(this, event);
                                },
                                onKeyUp: function (event) {
                                    selectOnKeyUp(this, event);
                                },
                                onKeyPress: function (event) {
                                    return selectOnKeyPress(this, event);
                                },
                                onChange: function (event) {
                                    gestUm(this);
                                    selectOnChange(this, event);
                                },
                                setup: function (_style) {
                                    elemSetup(this, _style);
                                }
                            }, {
                                id: 'borderSpacingUm',
                                type: 'select',
                                labelLayout: 'horizontal',
                                style: 'width:45px',
                                label: '',
                                'default': 'px',
                                items: _um,
                                onChange: function () {
                                    var dialog = this.getDialog();
                                    var relElement = dialog.getContentElement('page9', this.id.substring(0, this.id.length - 2));
                                    preview(relElement);
                                }
                            }]
                        }, {
                            id: 'emptyCells',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['150px'],
                            label: 'empty-cells',
                            'default': '',
                            items: _emptyCells,
                            onChange: function () {
                                preview(this);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            id: 'captionSide',
                            type: 'select',
                            labelLayout: 'horizontal',
                            widths: ['150px'],
                            label: 'captionSide',
                            'default': '',
                            items: _captionSide,
                            onChange: function () {
                                preview(this);
                            },
                            setup: function (_style) {
                                elemSetup(this, _style);
                            }
                        }, {
                            type: 'html',
                            style: 'width:95%;',
                            html: CKEDITOR.tools.htmlEncode(editor.lang.common.preview) + '<br><div style="text-align:center;border:1px solid #c0c0c0;background-color:#ffffff;height:50px;overflow:auto"><div  id="' + imagePreviewBoxId + '9">AaBbYyGgLlJj</div></div>'
                        }, {
                            id: 'stylePreview',
                            type: 'textarea',
                            style: 'width:100%;',
                            rows: 3

                        }]
                }]

            }]
        };

        function onLoad() { }
        function onHide() { }
        function onCancel() { }
    };
    CKEDITOR.dialog.add('CKCss', function (editor) {
        return exampleDialog(editor);
    });



    /*--------------------------------------------------------------
     http://chakrabarty.com/pp_editable_dropdown.html
     http://chakrabarty.com/combobox.html
     --------------------------------------------------------------*/

    /*----------------------------------------------
     The Common functions used for all dropdowns are:
     -----------------------------------------------

     -- function FindKeyCode(e)
     -- function FindKeyChar(e)
     -- function fnLeftToRight(getdropdown)
     -- function fnRightToLeft(getdropdown)

     --------------------------- source: http://chakrabarty.com/pp_editable_dropdown.html */

    function fnLeftToRight(getdropdown)
    {
        getdropdown.style.direction = "ltr";
    }

    function fnRightToLeft(getdropdown)
    {
        getdropdown.style.direction = "rtl";
    }


    /*
     Since Internet Explorer and NetscapeFirefoxChrome have different
     ways of returning the key code, displaying keys
     browser-independently is a bit harder.
     However, you can create a script that displays keys
     for either browser.
     The following function will display each key
     in the status line:

     The "FindKey.." function receives the "event" object
     from the event handler and stores it in the variable "e".
     It checks whether the "e.which" property exists (for NetscapeFirefoxChrome),
     and stores it in the "keycode" variable if present.
     Otherwise, it assumes the browser is Internet Explorer
     and assigns to keycode the "e.keyCode" property.
     */

    function FindKeyCode(e)
    {
        if(e.which)
        {
            keycode=e.which;  //NetscapeFirefoxChrome
        }
        else
        {
            keycode=e.keyCode; //Internet Explorer
        }

        //alert("FindKeyCode"+ keycode);
        return keycode;
    }

    function FindKeyChar(e)
    {
        keycode = FindKeyCode(e);
        if((keycode==8)||(keycode==127))
        {
            character="backspace"
        }
        else if((keycode==46))
        {
            character="delete"
        }
        else
        {
            character=String.fromCharCode(keycode);
        }
        //alert("FindKey"+ character);
        return character;
    }

    /*----------------------------------------------
     Dropdown specific global variables are:
     -----------------------------------------------
     1) vEditableOptionIndex_A   --> this needs to be set by Programmer!! See explanation.
     2) vEditableOptionText_A    --> this needs to be set by Programmer!! See explanation.
     3) vUseActualTexbox_A       --> this needs to be set by Programmer!! See explanation.
     4) vPreviousSelectIndex_A
     5) vSelectIndex_A
     6) vSelectChange_A

     --------------------------- source: http://chakrabarty.com/pp_editable_dropdown.html */

    /*----------------------------------------------
     Dropdown specific functions
     (which manipulate dropdown specific global variables)
     -----------------------------------------------
     1) function fnChangeHandler_A(getdropdown)
     2) function fnFocusHandler_A (getdropdown)
     3) function fnKeyPressHandler_A(getdropdown, e)
     4) function fnKeyUpHandler_A(getdropdown, e)
     5) function fnKeyDownHandler_A(getdropdown, e)

     --------------------------- source: http://chakrabarty.com/pp_editable_dropdown.html */

    /*------------------------------------------------
     IMPORTANT: Global Variable required to be SET by programmer
     -------------------------- source: http://chakrabarty.com/pp_editable_dropdown.html  */

    var vEditableOptionIndex_A = 0;

    // Give Index of Editable option in the dropdown.
    // For eg.
    // if first option is editable then vEditableOptionIndex_A = 0;
    // if second option is editable then vEditableOptionIndex_A = 1;
    // if third option is editable then vEditableOptionIndex_A = 2;
    // if last option is editable then vEditableOptionIndex_A = (length of dropdown - 1).
    // Note: the value of vEditableOptionIndex_A cannot be greater than (length of dropdown - 1)

    var vEditableOptionText_A = "--?--";

    // Give the default text of the Editable option in the dropdown.
    // For eg.
    // if the editable option is <option ...>--?--</option>,
    // then set vEditableOptionText_A = "--?--";

    var vUseActualTexbox_A = "no";
    // = "no" ...
    //      default is 'no' because there is no need to use an actual textbox if using a PC (with physical keyboard)
    //      if using iPad/iPhone or Android device, which usually have a virtual soft keyboard, then textbox will automatically show up next to dropdown on those devices
    // = "yes" ...
    //      set this to 'yes' if and only if you want an actual textbox to show up next to dropdown at all times (even on devices with physical keyboards)

    /*------------------------------------------------
     Global Variables required for
     fnChangeHandler_A(), fnKeyPressHandler_A() and fnKeyUpHandler_A()
     for Editable Dropdowns
     -------------------------- source: http://chakrabarty.com/pp_editable_dropdown.html  */

    var vPreviousSelectIndex_A = 0;
    // Contains the Previously Selected Index, set to 0 by default

    var vSelectIndex_A = 0;
    // Contains the Currently Selected Index, set to 0 by default

    var vSelectChange_A = 'MANUAL_CLICK';
    // Indicates whether Change in dropdown selected option
    // was due to a Manual Click
    // or instead due to System properties of dropdown.

    // vSelectChange_A = 'MANUAL_CLICK' indicates that
    // the jump to a non-editable option in the dropdown was due
    // to a Manual click (i.e.,changed on purpose by user).

    // vSelectChange_A = 'AUTO_SYSTEM' indicates that
    // the jump to a non-editable option was due to System properties of dropdown
    // (i.e.,user did not change the option in the dropdown;
    // instead an automatic jump happened due to inbuilt
    // dropdown properties of browser on typing of a character )

    /*------------------------------------------------
     Functions required for  Editable Dropdowns
     -------------------------- source: http://chakrabarty.com/pp_editable_dropdown.html  */

    function fnSanityCheck_A(getdropdown)
    {
        if(vEditableOptionIndex_A>(getdropdown.options.length-1))
        {
            alert("PROGRAMMING ERROR: The value of variable vEditableOptionIndex_... cannot be greater than (length of dropdown - 1)");
            return false;
        }
    }

    function fnKeyDownHandler_A(getdropdown, e)
    {
        fnSanityCheck_A(getdropdown);

        // Press [ <- ] and [ -> ] arrow keys on the keyboard to change alignment/flow.
        // ...go to Start : Press  [ <- ] Arrow Key
        // ...go to End : Press [ -> ] Arrow Key
        // (this is useful when the edited-text content exceeds the ListBox-fixed-width)
        // This works best on Internet Explorer, and not on NetscapeFirefoxChrome

        var vEventKeyCode = FindKeyCode(e);

        // Press left/right arrow keys
        if(vEventKeyCode == 37)
        {
            fnLeftToRight(getdropdown);
        }
        if(vEventKeyCode == 39)
        {
            fnRightToLeft(getdropdown);
        }

        // Delete key pressed
        if(vEventKeyCode == 46)
        {
            if(getdropdown.options.length != 0)
            // if dropdown is not empty
            {
                if (getdropdown.options.selectedIndex == vEditableOptionIndex_A)
                // if option is the Editable field
                {
                    getdropdown.options[getdropdown.options.selectedIndex].text = '';
                    getdropdown.options[getdropdown.options.selectedIndex].value = '';
                }
            }
        }

        // backspace key pressed
        if(vEventKeyCode == 8 || vEventKeyCode == 127)
        {
            if(getdropdown.options.length != 0)
            // if dropdown is not empty
            {
                if (getdropdown.options.selectedIndex == vEditableOptionIndex_A)
                // if option is the Editable field
                {
                    // make Editable option Null if it is being edited for the first time
                    if ((getdropdown[vEditableOptionIndex_A].text == vEditableOptionText_A)||(getdropdown[vEditableOptionIndex_A].value == vEditableOptionText_A))
                    {
                        getdropdown.options[getdropdown.options.selectedIndex].text = '';
                        getdropdown.options[getdropdown.options.selectedIndex].value = '';
                    }
                    else
                    {
                        getdropdown.options[getdropdown.options.selectedIndex].text = getdropdown.options[getdropdown.options.selectedIndex].text.slice(0,-1);
                        getdropdown.options[getdropdown.options.selectedIndex].value = getdropdown.options[getdropdown.options.selectedIndex].value.slice(0,-1);
                    }
                }
            }
            if(e.which) //NetscapeFirefoxChrome
            {
                e.which = '';
            }
            else //Internet Explorer
            {
                e.keyCode = '';
            }
            if (e.cancelBubble)	  //Internet Explorer
            {
                e.cancelBubble = true;
                e.returnValue = false;
            }
            if (e.stopPropagation)	 //NetscapeFirefoxChrome
            {
                e.stopPropagation();
            }
            if (e.preventDefault)	 //NetscapeFirefoxChrome
            {
                e.preventDefault();
            }
        }
    }

    function fnFocusHandler_A(getdropdown)
    {
        //use textbox for devices such as android and ipad that don't have a physical keyboard (textbox allows use of virtual soft keyboard)
        if ( (navigator.userAgent.toLowerCase().search(/android|ipad|iphone|ipod/) > -1) || (vUseActualTexbox_A == 'yes') )
        {
            if (getdropdown[(vEditableOptionIndex_A)].selected == true)
            {
                document.getElementById('textboxoption_A').style.visibility='';
                document.getElementById('textboxoption_A').style.display='';
            }
            else
            {
                document.getElementById('textboxoption_A').style.visibility='hidden';
                document.getElementById('textboxoption_A').style.display='none';
            }
        }
    }

    function fnChangeHandler_A(getdropdown)
    {
        fnSanityCheck_A(getdropdown);

        vPreviousSelectIndex_A = vSelectIndex_A;
        // Contains the Previously Selected Index

        vSelectIndex_A = getdropdown.options.selectedIndex;
        // Contains the Currently Selected Index

        if ((vPreviousSelectIndex_A == (vEditableOptionIndex_A)) && (vSelectIndex_A != (vEditableOptionIndex_A))&&(vSelectChange_A != 'MANUAL_CLICK'))
        // To Set value of Index variables - source: http://chakrabarty.com/pp_editable_dropdown.html
        {
            getdropdown[(vEditableOptionIndex_A)].selected=true;
            vPreviousSelectIndex_A = vSelectIndex_A;
            vSelectIndex_A = getdropdown.options.selectedIndex;
            vSelectChange_A = 'MANUAL_CLICK';
            // Indicates that the Change in dropdown selected
            // option was due to a Manual Click
        }

        //use textbox for devices such as android and ipad that don't have a physical keyboard (textbox allows use of virtual soft keyboard)
        if ( (navigator.userAgent.toLowerCase().search(/android|ipad|iphone|ipod/) > -1) || (vUseActualTexbox_A == 'yes') )
        {
            fnFocusHandler_A(getdropdown);
        }
    }

    function fnKeyPressHandler_A(getdropdown, e)
    {
        fnSanityCheck_A(getdropdown);

        keycode = FindKeyCode(e);
        keychar = FindKeyChar(e);

        // Check for allowable Characters
        // The various characters allowable for entry into Editable option..
        // may be customized by minor modifications in the code (if condition below)
        // (you need to know the keycode/ASCII value of the  character to be allowed/disallowed.
        // - source: http://chakrabarty.com/pp_editable_dropdown.html

        if ((keycode>47 && keycode<59)||(keycode>62 && keycode<127) ||(keycode==32))
        {
            var vAllowableCharacter = "yes";
        }
        else
        {
            var vAllowableCharacter = "no";
        }

        //alert(window); alert(window.event);

        if(getdropdown.options.length != 0)
        // if dropdown is not empty
            if (getdropdown.options.selectedIndex == (vEditableOptionIndex_A))
            // if selected option the Editable option of the dropdown
            {

                // Empty space (ascii 32)  is not captured by NetscapeFirefoxChrome when .text is used
                // NetscapeFirefoxChrome removes extra spaces at end of string when .text is used
                // NetscapeFirefoxChrome allows one empty space at end of string when .value is used
                // Hence, use .value insead of .text
                var vEditString = getdropdown[vEditableOptionIndex_A].value;

                // make Editable option Null if it is being edited for the first time
                if(vAllowableCharacter == "yes")
                {
                    if ((getdropdown[vEditableOptionIndex_A].text == vEditableOptionText_A)||(getdropdown[vEditableOptionIndex_A].value == vEditableOptionText_A))
                        vEditString = "";
                }

                if (vAllowableCharacter == "yes")
                // To handle addition of a character - source: http://chakrabarty.com/pp_editable_dropdown.html
                {
                    vEditString+=String.fromCharCode(keycode);
                    // Concatenate Enter character to Editable string

                    // The following portion handles the "automatic Jump" bug
                    // The "automatic Jump" bug (Description):
                    //   If a alphabet is entered (while editing)
                    //   ...which is contained as a first character in one of the read-only options
                    //   ..the focus automatically "jumps" to the read-only option
                    //   (-- this is a common property of normal dropdowns
                    //    ..but..is undesirable while editing).

                    var i=0;
                    var vEnteredChar = String.fromCharCode(keycode);
                    var vUpperCaseEnteredChar = vEnteredChar;
                    var vLowerCaseEnteredChar = vEnteredChar;


                    if(((keycode)>=97)&&((keycode)<=122))
                    // if vEnteredChar lowercase
                        vUpperCaseEnteredChar = String.fromCharCode(keycode - 32);
                    // This is UpperCase


                    if(((keycode)>=65)&&((keycode)<=90))
                    // if vEnteredChar is UpperCase
                        vLowerCaseEnteredChar = String.fromCharCode(keycode + 32);
                    // This is lowercase

                    if(e.which) //For NetscapeFirefoxChrome
                    {
                        // Compare the typed character (into the editable option)
                        // with the first character of all the other
                        // options (non-editable).

                        // To note if the jump to the non-editable option was due
                        // to a Manual click (i.e.,changed on purpose by user)
                        // or instead due to System properties of dropdown
                        // (i.e.,user did not change the option in the dropdown;
                        // instead an automatic jump happened due to inbuilt
                        // dropdown properties of browser on typing of a character )

                        for (i=0;i<=(getdropdown.options.length-1);i++)
                        {
                            if(i!=vEditableOptionIndex_A)
                            {
                                var vEnteredDigitNumber = getdropdown[vEditableOptionIndex_A].text.length;
                                var vFirstReadOnlyChar = getdropdown[i].text.substring(0,1);
                                var vEquivalentReadOnlyChar = getdropdown[i].text.substring(vEnteredDigitNumber,vEnteredDigitNumber+1);
                                if (vEnteredDigitNumber >= getdropdown[i].text.length)
                                {
                                    vEquivalentReadOnlyChar = vFirstReadOnlyChar;
                                }
                                if( (vEquivalentReadOnlyChar == vUpperCaseEnteredChar)||(vEquivalentReadOnlyChar == vLowerCaseEnteredChar)
                                    ||(vFirstReadOnlyChar == vUpperCaseEnteredChar)||(vFirstReadOnlyChar == vLowerCaseEnteredChar) )
                                {
                                    vSelectChange_A = 'AUTO_SYSTEM';
                                    // Indicates that the Change in dropdown selected
                                    // option was due to System properties of dropdown
                                    break;
                                }
                                else
                                {
                                    vSelectChange_A = 'MANUAL_CLICK';
                                    // Indicates that the Change in dropdown selected
                                    // option was due to a Manual Click
                                }
                            }
                        }
                    }
                }

                // Set the new edited string into the Editable option
                getdropdown.options[vEditableOptionIndex_A].text = vEditString;
                getdropdown.options[vEditableOptionIndex_A].value = vEditString;

                return false;
            }
        return true;
    }

    function fnKeyUpHandler_A(getdropdown, e)
    {
        fnSanityCheck_A(getdropdown);

        if(e.which) // NetscapeFirefoxChrome
        {
            if(vSelectChange_A == 'AUTO_SYSTEM')
            {
                // if editable dropdown option jumped while editing
                // (due to typing of a character which is the first character of some other option)
                // then go back to the editable option.
                getdropdown[(vEditableOptionIndex_A)].selected=true;
                vSelectChange_A = 'MANUAL_CLICK';
            }

            var vEventKeyCode = FindKeyCode(e);
            // if [ <- ] or [ -> ] arrow keys are pressed, select the editable option
            if((vEventKeyCode == 37)||(vEventKeyCode == 39))
            {
                getdropdown[vEditableOptionIndex_A].selected=true;
            }
        }
    }

    /*-------------------------------------------------------------------------------------------- source: http://chakrabarty.com/pp_editable_dropdown.html */

    /***************************************************************

     http://chakrabarty.com/pp_editable_dropdown.html
     http://chakrabarty.com/combobox.html

     ***************************************************************/

    function Hash() {
        this.length = 0;
        this.items = new Array();
        for (var i = 0; i < arguments.length; i += 2) {
            if (typeof (arguments[i + 1]) != 'undefined') {
                this.items[arguments[i]] = arguments[i + 1];
                this.length++;
            }
        }

        this.removeItem = function (in_key) {
            var tmp_previous;
            if (typeof (this.items[in_key]) != 'undefined') {
                this.length--;
                var tmp_previous = this.items[in_key];
                delete this.items[in_key];
            }

            return tmp_previous;
        }

        this.getItem = function (in_key) {
            return this.items[in_key];
        }

        this.setItem = function (in_key, in_value) {
            var tmp_previous;
            if (typeof (in_value) != 'undefined') {
                if (typeof (this.items[in_key]) == 'undefined') {
                    this.length++;
                }
                else {
                    tmp_previous = this.items[in_key];
                }

                this.items[in_key] = in_value;
            }

            return tmp_previous;
        }

        this.hasItem = function (in_key) {
            return typeof (this.items[in_key]) != 'undefined';
        }

        this.clear = function () {
            for (var i in this.items) {
                delete this.items[i];
            }

            this.length = 0;
        }
    }
})();
