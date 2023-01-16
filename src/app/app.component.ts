import { PrimeNGConfig } from 'primeng/api';
import { Component, OnInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'user';
  step = 0;
  constructor(private primengConfig: PrimeNGConfig) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.primengConfig.setTranslation(
        {
            "startsWith": "Starts with",
            "contains": "Contains",
            "notContains": "Not contains",
            "endsWith": "Ends with",
            "equals": "Equals",
            "notEquals": "Not equals",
            "noFilter": "No Filter",
            "lt": "Less than",
            "lte": "Less than or equal to",
            "gt": "Greater than",
            "gte": "Greater than or equal to",
            "is": "Is",
            "isNot": "Is not",
            "before": "Before",
            "after": "After",
            "dateIs": "Date is",
            "dateIsNot": "Date is not",
            "dateBefore": "Date is before",
            "dateAfter": "Date is after",
            "clear": "Clear",
            "apply": "Apply",
            "matchAll": "Match All",
            "matchAny": "Match Any",
            "addRule": "Add Rule",
            "removeRule": "Remove Rule",
            "accept": "Yes",
            "reject": "No",
            "choose": "选择",
            "upload": "上传",
            "cancel": "关闭",
            "dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "dayNamesShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            "dayNamesMin": ["Su","Mo","Tu","We","Th","Fr","Sa"],
            "monthNames": ["January","February","March","April","May","June","July","August","September","October","November","December"],
            "monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "dateFormat": "mm/dd/yy",
            "firstDayOfWeek": 0,
            "today": "Today",
            "weekHeader": "Wk",
            "weak": "Weak",
            "medium": "Medium",
            "strong": "Strong",
            "passwordPrompt": "Enter a password",
            "emptyMessage": "No results found",
            "emptyFilterMessage": "No results found"
        }
    
    
    );
    this.primengConfig.ripple = true;
  }
  setStep(index: number) {
    this.step = index;
  }


  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
