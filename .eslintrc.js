module.exports = {
	root: true,
	extends: '@react-native-community',
	rules: {
		indent: ['error', 'tab'],
		semi: ['error', 'never'],
		// 'object-curly-newline': [
		// 	'error',
		// 	{
		// 		ImportDeclaration: 'always',
		// 	},
		// ],
		'sort-imports': [
			'error',
			{
				ignoreCase: false,
				ignoreDeclarationSort: false,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
			},
		],
	},
}
