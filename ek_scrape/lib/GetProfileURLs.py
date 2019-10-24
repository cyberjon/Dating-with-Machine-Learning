# import dependencies
from bs4 import BeautifulSoup as bs

# define pages
strURLBase = 'https://www.pof.com/'

def Go(browser, strURL, intLimit):
	# define initial vars
	intCount = 0
	intPage = 1
	# define list of Profile URLs
	lstURLProfile = []
	# go to the "my city" page
	browser.visit(strURL)
	# grab profile URLs
	while 1 == 1:
		# get "who's online" page
		html = browser.html
		soup = bs(html, "html.parser")
		lstDiv = soup.find_all("div", class_="results")
		if len(lstDiv) == 0:
			break
		# iterate thru "My City" page
		for strItem in lstDiv:
			if intCount >= intLimit:
				break
			else:
				strURLProfile = strURLBase + strItem.find('a')['href']
				if strURLProfile not in lstURLProfile:
					lstURLProfile.append(strURLProfile)
					intCount += 1
					print(f"{intCount} profile urls found")
				else:
					continue
		# when page is done: increment intPage
		intPage += 1
		try:
			strURLNewPage = ''
			if strURL[-11:] == 'mycity.aspx':
				strURLNewPage = strURL + '?page=' + str(intPage)
			if strURL[-11:] == 'search.aspx':
				strURLNewPage = strURLBase + soup.find(id = 'basicsearch_nextpage')['href']
			browser.visit(strURLNewPage)
		except:
			break
	return lstURLProfile