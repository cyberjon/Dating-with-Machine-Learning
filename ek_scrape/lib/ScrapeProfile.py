# import dependencies
import numpy as np
import os
import urllib.request

# define function: scrape profile
def Go(soup, browser, strUsername, strPOFSection):
	dictProfile = {}
	
	# add username and headline to dictProfile
	dictProfile['username'] = soup.find(id = 'username').text
	dictProfile['headline'] = soup.find(id = 'headline').text

	# GET INFO FROM PROFILE TABLE 1
	dictProfile = ScrapeProfile1(soup, dictProfile)
	# GET INFO FROM PROFILE TABLE 2
	dictProfile = ScrapeProfile2(soup, dictProfile)
	# INTERESTS
	try:
		lstInterests = soup.find(id='interests').text.split('\n')[1:4]
	except: 
		lstInterests = 'None'
		print('No interests were entered')
	dictProfile['interests'] = lstInterests
	# ABOUT ME DESCRIPTION
	lstDesc = soup.find(id='description').text.replace('\n', '')
	lstDescSplit = lstDesc.split(' ')
	dictProfile['about_me_text'] = lstDesc
	dictProfile['about_me_split'] = lstDescSplit
	# THUMBNAILS
	ScrapeThumbs(soup, browser, dictProfile, strUsername, strPOFSection)
	return dictProfile

# define function: scrape profile table 1
def ScrapeProfile1(soup, dictProfile):
	# part 1: find header names for first profile table
	lstOutHead1 = PopulateList(soup, 'div', 'profileheadtitle', False)
	# part 2: find first half of content (left side of table)
	lstOutAbout1 = PopulateList(soup, 'div', 'profileheadcontent', True)
	# part 3: find 2nd half of content (right side of table)
	lstOutAbout2 = PopulateList(soup, 'div', 'profileheadcontent-narrow', True)
	# part 4: combine both 'About's into one list
	arrOutAbout = np.array([lstOutAbout1, lstOutAbout2])
	lstOutAbout = np.ravel(arrOutAbout, order = 'F')
	# define dictionary to hold first profile table data
	dictProfile1 = dict(zip(lstOutHead1, lstOutAbout))
	# add to dict
	dictProfile['profile_info_1'] = dictProfile1
	return dictProfile

# define function: scrape profile table 2
def ScrapeProfile2(soup, dictProfile):
	lstRawAbout3 = soup.find_all('span', class_='headline')
	lstOutAbout3 = []
	for i in range(9, 25):
		lstOutAbout3.append(lstRawAbout3[i].text.replace('\n', ''))
	lstRawAbout4 = soup.find_all('table')[1]('span', class_='txtGrey')
	lstOutAbout4 = []
	for soupItem in lstRawAbout4:
		lstOutAbout4.append(soupItem.text.replace('\n', ''))
	# define dictionary to hold second profile table data
	dictProfile2 = dict(zip(lstOutAbout3, lstOutAbout4))
	# add to dict
	dictProfile['profile_info_2'] = dictProfile2
	return dictProfile

# define function: scrape profile thumbnails
def ScrapeThumbs(soup, browser, dictProfile, strUsername, strPOFSection):
	# define vars
	intCount = 0
	strSubdir = ''
	strDir = ''
	# create dir, if it doesn't exist
	if strPOFSection[-11:] == 'mycity.aspx':
		strSubdir = 'MyCity'
	if strPOFSection[-11:] == 'search.aspx':
		strSubdir = 'Online'
	strDir = f'img/{strUsername}/{strSubdir}'
	if not os.path.exists(strDir):
		os.mkdir(strDir)
	# iterate through all "image-thumb-wrap" divs and save thumbnails
	lstDiv = soup.find_all('div', class_='image-thumb-wrap')
	for soupItem in lstDiv:
		lstSubItem = soupItem.find_all('img')
		for soupSubItem in lstSubItem:
			strURL = soupSubItem['src']
			try:
				urllib.request.urlretrieve(strURL, f'{strDir}/{dictProfile["username"]}.{intCount:02d}.png')
				intCount += 1
			except Exception as e:
				continue

# define helper function: scrape a list of tags and change it into a list of text
def PopulateList(soup, strTag, strClass, fReplaceDoubleReturns):
	lstRaw = soup.find_all(strTag, class_= strClass)
	lstOut = []
	if fReplaceDoubleReturns:
		for soupItem in lstRaw:
			lstOut.append(soupItem.text.replace('\n\n', '').replace('\n', ' '))
	else:
		for soupItem in lstRaw:
			lstOut.append(soupItem.text.replace('\n', ''))
	return lstOut