exports.definition = {
	config: {
		columns: {
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
			"projectId": "INTEGER",
			"description": "text",
			"date": "text",
			"type": "text",
			"status": "text",
			"color": "text"
		},
		
		adapter: {
			type: "sql",
			collection_name: "Todo",
			db_name: "dbTodos",
			idAttribute: "id",
			remoteBackup: false
		}

	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
            validate: function(attrs, options) {
                if (!attrs.description || attrs.description.length <= 0) {
                    return "Error: No description!";
                } 
            }
        });
		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			getTodoForProject: function(projectId) {
				var collection = this;
				projectId = projectId || 1;
				collection.fetch({query: "select * from todo where projectId = " + projectId + " order by status desc, type asc"});
			}
		});
		return Collection;
	}
};