arrayToSingleSelect=function(data)
	{
		var arrayList=[];
		if(data.length>0)
		{
			arrayList.push({"key":null,"value":"Please Select"});
			for(var i=0;i<data.length;i++)
				{
				arrayList.push({"key":data[i],"value":data[i]});
				}
		}
		//alert(angular.toJson(arrayList));
		
		return arrayList;
	}

specialCharacterValidation=function(text)
{
	var letters = /^[0-9a-zA-Z]+$/;
	if(text.match(letters))
	{
		return false;
	}
	else
	{
	   return true;
	}
	
}
specialCharacterValidationAlpha=function(text)
{
	var letters = /^[a-zA-Z]+$/;
	if(text.match(letters))
	{
		return false;
	}
	else
	{
	   return true;
	}
	
}
calculateNoOfDayBetweenDate=function(fromDate,toDate)
{
	var date2 = new Date(fromDate);
    var date1 = new Date(toDate);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
   
    return dayDifference;
}


CalculateSunday=function(fromDate, toDate){
   
    var startDate = new Date(fromDate);
    var endDate = new Date(toDate);
    var totalSundays = 0;

    for (var i = startDate; i <= endDate; ){
        if (i.getDay() == 0){
            totalSundays++;
        }
        i.setTime(i.getTime() + 1000*60*60*24);
    }

  
    return totalSundays ;
}

CalculateSaturday=function(fromDate, toDate){
   
    var startDate = new Date(fromDate);
    var endDate = new Date(toDate);
    var saturday = 0;

    for (var i = startDate; i <= endDate; ){
        if (i.getDay() == 6){
        	saturday++;
        }
        i.setTime(i.getTime() + 1000*60*60*24);
    }

  
    return saturday ;
}


arrayToSingleSelectWithoutNull=function(data)
{
	var arrayList=[];
	if(data.length>0)
	{
		
		for(var i=0;i<data.length;i++)
			{
			arrayList.push({"key":data[i],"value":data[i]});
			}
	}
	//alert(angular.toJson(arrayList));
	
	return arrayList;
}
alphaCharacterValidation=function(text)
{
	var letters = /^[a-zA-Z]+$/;
	if(text.match(letters))
	{
		return false;
	}
	else
	{
	   return true;
	}
}
arrayToSingleSelectForOEM=function(data)
{
	
	var arrayList=[];
	if(data.length>0)
	{
		arrayList.push({"key":null,"value":"Please Select"});
		for(var i=0;i<data.length;i++)
			{
			arrayList.push({"key":data[i].split("-")[0],"value":data[i].split("-")[0]+"-"+data[i].split("-")[1]});
			}
	}
	return arrayList;
	
}

specialCharacterNumValidation=function(text)
{
	
	var pattern = /^\d+$/;
	if(pattern.test(text))
	{
		return false;
	}
	else
	{
	   return true;
	}
	
}