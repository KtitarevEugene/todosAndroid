exports.definition = {
	config: {
		columns: {
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
			"projectName": "text"
		},
		
		adapter: {
			type: "sql",
			collection_name: "Project",
			db_name: "dbTodos",
			idAttribute: "id",
			remoteBackup: false
		}
	},
	
	extendModel: function(Model) {
		_.extend(Model.prototype, {});
		return Model;
	},
	
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			fetchSorted: function() {
				var collection = this;
				collection.fetch({query: "select * from project order by projectName asc"});
			}
		});
		return Collection;
	}
};