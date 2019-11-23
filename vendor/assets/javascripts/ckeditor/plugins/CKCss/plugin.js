CKEDITOR.plugins.add('CKCss',
{
    lang: ['en','ru'], 
    requires: ['iframedialog'],	
	beforeInit: function (editor) {
		
		var head = CKEDITOR.document.getHead();
		head.append(CKEDITOR.document.createElement('link', 
		{
          attributes: 
		  {
				type: 'text/css',
				rel: 'stylesheet',
				href: CKEDITOR.getUrl('plugins/CKCss/css/styles.css')
		   }
		})
		);
	},
    init: function (editor) {
        var pluginName = 'CKCss';
        CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/ckcss.js');
        //this doesnt work
        //editor.addContentsCss(CKEDITOR.getUrl('plugins/CKCss/css/styles.css'));
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton('CKCss',
        {
            label: 'CSS Editor for CKEditor', command: pluginName,
            icon: CKEDITOR.getUrl('plugins/CKCss/ckcss.png')
        });
    },
	 afterInit: function (editor) {
        var dataProcessor = editor.dataProcessor,
            htmlFilter = dataProcessor && dataProcessor.htmlFilter;
   
        if (htmlFilter) {
            htmlFilter.addRules({
                elements: {
                    span: function (element) {
						
						if(element.attributes.id == 'data-remove-span')
						{
							delete element.name;
							return element;
						}
						
						
						if (element.attributes.style && element.attributes.style.length > 0) {
                            
							if(element.attributes.scaytid)
								delete element.attributes.scaytid;
								
							if(element.attributes.scayt_word)
								delete element.attributes.scayt_word;	
				                           
                        }
						return element;
                    }
                }
            });
        }
        
    }
}
);
